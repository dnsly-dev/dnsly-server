import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RemoteConfigService {
  constructor(private prisma: PrismaService) {}

  async getDnsServers() {
    return this.prisma.dnsServerConfig.findMany({
      where: { isEnabled: true },
      orderBy: { order: 'asc' },
    });
  }

  async getBlocklists() {
    return this.prisma.blocklistConfig.findMany({
      where: { isEnabled: true },
      orderBy: { order: 'asc' },
    });
  }
}
