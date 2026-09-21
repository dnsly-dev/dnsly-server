import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverviewMetrics() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // 1. Device Counts
    const totalDevices = await this.prisma.device.count();
    const activeDevices24h = await this.prisma.device.count({
      where: { lastSeenAt: { gte: oneDayAgo } },
    });
    const activeDevices7d = await this.prisma.device.count({
      where: { lastSeenAt: { gte: sevenDaysAgo } },
    });

    // 2. Query Aggregations (Latest snapshot per device)
    const devicesWithLatestHeartbeat = await this.prisma.device.findMany({
      include: {
        heartbeats: {
          take: 1,
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    let totalQueries = 0;
    let blockedQueries = 0;
    const providerCounts: Record<string, number> = {};

    for (const device of devicesWithLatestHeartbeat) {
      const latestHb = device.heartbeats[0];
      if (latestHb) {
        totalQueries += latestHb.totalQueries;
        blockedQueries += latestHb.blockedQueries;
        providerCounts[latestHb.selectedProvider] = (providerCounts[latestHb.selectedProvider] || 0) + 1;
      }
    }

    const blockRate = totalQueries > 0 ? ((blockedQueries / totalQueries) * 100).toFixed(1) : '0.0';

    // 3. Real 7-day daily time-series traffic
    const dailyData: Array<{ dayLabel: string; date: string; totalQueries: number; blockedQueries: number }> = [];
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i, 0, 0, 0, 0);
      const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i, 23, 59, 59, 999);

      const dayHeartbeats = await this.prisma.heartbeat.findMany({
        where: {
          timestamp: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
        select: {
          totalQueries: true,
          blockedQueries: true,
        },
      });

      const dayTotal = dayHeartbeats.reduce((acc, h) => acc + h.totalQueries, 0);
      const dayBlocked = dayHeartbeats.reduce((acc, h) => acc + h.blockedQueries, 0);

      dailyData.push({
        dayLabel: dayNames[dayStart.getDay()],
        date: dayStart.toISOString().split('T')[0],
        totalQueries: dayTotal,
        blockedQueries: dayBlocked,
      });
    }

    // 4. App Version Distribution
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
        total7d: totalQueries,
        blocked7d: blockedQueries,
        blockRatePercent: parseFloat(blockRate),
      },
      dailyTraffic: dailyData,
      providerDistribution: providerCounts,
      versionDistribution: (versionGrouping || []).map((v) => ({
        version: v.appVersion,
        count: v._count.id,
      })),
      timestamp: now,
    };
  }

  async getDevicesList(
    page: number = 1,
    limit: number = 20,
    search?: string,
    shieldEnabled?: string,
    provider?: string,
  ) {
    const validPage = Number.isInteger(page) && page > 0 ? page : 1;
    const validLimit = Number.isInteger(limit) && limit > 0 ? Math.min(limit, 100) : 20;
    const skip = (validPage - 1) * validLimit;

    const where: any = {};
    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { id: { contains: q, mode: 'insensitive' } },
        { deviceModel: { contains: q, mode: 'insensitive' } },
        { osVersion: { contains: q, mode: 'insensitive' } },
        { countryCode: { contains: q, mode: 'insensitive' } },
      ];
    }

    const heartbeatFilter: any = {};
    if (shieldEnabled === 'true') {
      heartbeatFilter.shieldEnabled = true;
    } else if (shieldEnabled === 'false') {
      heartbeatFilter.shieldEnabled = false;
    }
    if (provider && provider.trim()) {
      heartbeatFilter.selectedProvider = { contains: provider.trim(), mode: 'insensitive' };
    }

    if (Object.keys(heartbeatFilter).length > 0) {
      where.heartbeats = { some: heartbeatFilter };
    }

    try {
      const [total, devices] = await Promise.all([
        this.prisma.device.count({ where }),
        this.prisma.device.findMany({
          where,
          skip,
          take: validLimit,
          orderBy: { lastSeenAt: 'desc' },
          include: {
            heartbeats: {
              take: 1,
              orderBy: { timestamp: 'desc' },
            },
          },
        }),
      ]);

      const formattedDevices = (devices || []).map((d) => ({
        id: d.id,
        appVersion: d.appVersion,
        deviceModel: d.deviceModel || 'Unknown Device',
        osVersion: d.osVersion || 'Android',
        countryCode: d.countryCode || 'N/A',
        firstSeenAt: d.firstSeenAt,
        lastSeenAt: d.lastSeenAt,
        isActive: d.isActive,
        lastHeartbeat: d.heartbeats?.[0] || null,
      }));

      return {
        total: total || 0,
        page: validPage,
        limit: validLimit,
        totalPages: Math.ceil((total || 0) / validLimit),
        devices: formattedDevices,
      };
    } catch (err: any) {
      console.error('AnalyticsService.getDevicesList error:', err);
      return {
        total: 0,
        page: validPage,
        limit: validLimit,
        totalPages: 0,
        devices: [],
      };
    }
  }

  async getHeartbeatsPaginated(
    page: number = 1,
    limit: number = 20,
    search?: string,
    shieldEnabled?: string,
    provider?: string,
  ) {
    const validPage = Number.isInteger(page) && page > 0 ? page : 1;
    const validLimit = Number.isInteger(limit) && limit > 0 ? Math.min(limit, 100) : 20;
    const skip = (validPage - 1) * validLimit;

    const where: any = {};
    if (shieldEnabled === 'true') {
      where.shieldEnabled = true;
    } else if (shieldEnabled === 'false') {
      where.shieldEnabled = false;
    }

    if (provider && provider.trim()) {
      where.selectedProvider = { contains: provider.trim(), mode: 'insensitive' };
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { deviceId: { contains: q, mode: 'insensitive' } },
        { device: { deviceModel: { contains: q, mode: 'insensitive' } } },
        { device: { countryCode: { contains: q, mode: 'insensitive' } } },
        { selectedProvider: { contains: q, mode: 'insensitive' } },
      ];
    }

    try {
      const [total, heartbeats] = await Promise.all([
        this.prisma.heartbeat.count({ where }),
        this.prisma.heartbeat.findMany({
          where,
          skip,
          take: validLimit,
          orderBy: { timestamp: 'desc' },
          include: {
            device: {
              select: {
                deviceModel: true,
                osVersion: true,
                countryCode: true,
                appVersion: true,
              },
            },
          },
        }),
      ]);

      return {
        total: total || 0,
        page: validPage,
        limit: validLimit,
        totalPages: Math.ceil((total || 0) / validLimit),
        heartbeats: heartbeats || [],
      };
    } catch (err: any) {
      console.error('AnalyticsService.getHeartbeatsPaginated error:', err);
      return {
        total: 0,
        page: validPage,
        limit: validLimit,
        totalPages: 0,
        heartbeats: [],
      };
    }
  }

  async getRecentHeartbeats(limit: number = 50) {
    const validLimit = Math.min(Math.max(limit, 1), 200);
    return this.prisma.heartbeat.findMany({
      take: validLimit,
      orderBy: { timestamp: 'desc' },
      include: {
        device: {
          select: {
            deviceModel: true,
            osVersion: true,
            countryCode: true,
            appVersion: true,
          },
        },
      },
    });
  }
}
