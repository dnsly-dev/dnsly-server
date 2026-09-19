import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HeartbeatDto } from './dto/heartbeat.dto';

@Injectable()
export class TelemetryService {
  constructor(private prisma: PrismaService) {}

  async processHeartbeat(dto: HeartbeatDto, geoCountryCode?: string) {
    const now = new Date();

    // Determine most accurate country code:
    // 1. Valid 2-letter Cloudflare / GeoIP header (if not XX or T1)
    // 2. Client-provided carrier / locale ISO (if non-empty)
    // 3. Fallback
    let effectiveCountry = dto.countryCode?.trim().toUpperCase();
    if (geoCountryCode && geoCountryCode.length === 2 && geoCountryCode !== 'XX' && geoCountryCode !== 'T1') {
      effectiveCountry = geoCountryCode;
    }

    // 1. Upsert Device record
    const device = await this.prisma.device.upsert({
      where: { id: dto.deviceId },
      update: {
        appVersion: dto.appVersion,
        deviceModel: dto.deviceModel || undefined,
        osVersion: dto.osVersion || undefined,
        countryCode: effectiveCountry || undefined,
        cpuArch: dto.cpuArch || undefined,
        lastSeenAt: now,
        isActive: true,
      },
      create: {
        id: dto.deviceId,
        appVersion: dto.appVersion,
        deviceModel: dto.deviceModel,
        osVersion: dto.osVersion,
        countryCode: effectiveCountry || 'US',
        cpuArch: dto.cpuArch,
        firstSeenAt: now,
        lastSeenAt: now,
        isActive: true,
      },
    });

    // 2. Record Heartbeat Snapshot
    const heartbeatTime = dto.timestamp ? new Date(dto.timestamp) : now;
    const heartbeat = await this.prisma.heartbeat.create({
      data: {
        deviceId: dto.deviceId,
        selectedProvider: dto.selectedProvider,
        shieldEnabled: dto.shieldEnabled,
        totalQueries: dto.totalQueries,
        blockedQueries: dto.blockedQueries,
        timestamp: heartbeatTime,
      },
    });

    return {
      status: 'accepted',
      deviceId: device.id,
      countryCode: effectiveCountry,
      recordedAt: heartbeat.timestamp,
    };
  }
}
