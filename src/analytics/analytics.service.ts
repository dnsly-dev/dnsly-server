import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverviewMetrics() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 1. Device Counts
    const totalDevices = await this.prisma.device.count();
    const activeDevices24h = await this.prisma.device.count({
      where: { lastSeenAt: { gte: oneDayAgo } },
    });
    const activeDevices7d = await this.prisma.device.count({
      where: { lastSeenAt: { gte: sevenDaysAgo } },
    });

    // 2. Query Aggregations (Last 24h & 7d)
    const recentHeartbeats = await this.prisma.heartbeat.findMany({
      where: { timestamp: { gte: sevenDaysAgo } },
      select: {
        totalQueries: true,
        blockedQueries: true,
        selectedProvider: true,
        shieldEnabled: true,
        timestamp: true,
      },
    });

    let totalQueries7d = 0;
    let blockedQueries7d = 0;
    let shieldEnabledCount = 0;
    const providerCounts: Record<string, number> = {};

    for (const hb of recentHeartbeats) {
      totalQueries7d += hb.totalQueries;
      blockedQueries7d += hb.blockedQueries;
      if (hb.shieldEnabled) shieldEnabledCount++;
      providerCounts[hb.selectedProvider] = (providerCounts[hb.selectedProvider] || 0) + 1;
    }

    const blockRate = totalQueries7d > 0 ? ((blockedQueries7d / totalQueries7d) * 100).toFixed(1) : '0.0';

    // 3. App Version Distribution
    const versionGrouping = await this.prisma.device.groupBy({
      by: ['appVersion'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });

    return {
      devices: {
        total: totalDevices,
        active24h: activeDevices24h,
        active7d: activeDevices7d,
      },
      queries: {
        total7d: totalQueries7d,
        blocked7d: blockedQueries7d,
        blockRatePercent: parseFloat(blockRate),
      },
      providerDistribution: providerCounts,
      versionDistribution: versionGrouping.map((v) => ({
        version: v.appVersion,
        count: v._count.id,
      })),
      timestamp: now,
    };
  }

  async getDevicesList(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [total, devices] = await Promise.all([
      this.prisma.device.count(),
      this.prisma.device.findMany({
        skip,
        take: limit,
        orderBy: { lastSeenAt: 'desc' },
        include: {
          heartbeats: {
            take: 1,
            orderBy: { timestamp: 'desc' },
          },
        },
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      devices: devices.map((d) => ({
        id: d.id,
        appVersion: d.appVersion,
        deviceModel: d.deviceModel || 'Unknown Device',
        osVersion: d.osVersion || 'Android',
        countryCode: d.countryCode || 'N/A',
        firstSeenAt: d.firstSeenAt,
        lastSeenAt: d.lastSeenAt,
        isActive: d.isActive,
        lastHeartbeat: d.heartbeats[0] || null,
      })),
    };
  }
}
