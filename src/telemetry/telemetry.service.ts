import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HeartbeatDto } from './dto/heartbeat.dto';

@Injectable()
export class TelemetryService {
  constructor(private prisma: PrismaService) {}

  async processHeartbeat(dto: HeartbeatDto) {
    const now = new Date();

    // 1. Upsert Device record
    const device = await this.prisma.device.upsert({
      where: { id: dto.deviceId },
      update: {
        appVersion: dto.appVersion,
        deviceModel: dto.deviceModel || undefined,
        osVersion: dto.osVersion || undefined,
        countryCode: dto.countryCode || undefined,
        cpuArch: dto.cpuArch || undefined,
        lastSeenAt: now,
        isActive: true,
      },
      create: {
        id: dto.deviceId,
        appVersion: dto.appVersion,
        deviceModel: dto.deviceModel,
        osVersion: dto.osVersion,
        countryCode: dto.countryCode,
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
      recordedAt: heartbeat.timestamp,
    };
  }
}
