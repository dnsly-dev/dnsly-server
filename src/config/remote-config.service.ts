import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RemoteConfigService {
  constructor(private prisma: PrismaService) {}

  // ─── Public Endpoints (Clients) ───
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

  // ─── Admin Endpoints ───
  async getAllDnsServersAdmin() {
    return this.prisma.dnsServerConfig.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async createDnsServer(data: {
    name: string;
    primaryIp: string;
    secondaryIp?: string;
    hostname?: string;
    dohUrl?: string;
    category?: string;
    isDefault?: boolean;
    isEnabled?: boolean;
    order?: number;
  }) {
    return this.prisma.dnsServerConfig.create({
      data: {
        name: data.name,
        primaryIp: data.primaryIp,
        secondaryIp: data.secondaryIp || null,
        hostname: data.hostname || null,
        dohUrl: data.dohUrl || null,
        category: data.category || 'PUBLIC',
        isDefault: data.isDefault || false,
        isEnabled: data.isEnabled !== undefined ? data.isEnabled : true,
        order: data.order || 0,
      },
    });
  }

  async updateDnsServer(id: string, data: Partial<{
    name: string;
    primaryIp: string;
    secondaryIp: string;
    hostname: string;
    dohUrl: string;
    category: string;
    isDefault: boolean;
    isEnabled: boolean;
    order: number;
  }>) {
    const existing = await this.prisma.dnsServerConfig.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('DNS server config not found');
    return this.prisma.dnsServerConfig.update({
      where: { id },
      data,
    });
  }

  async deleteDnsServer(id: string) {
    const existing = await this.prisma.dnsServerConfig.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('DNS server config not found');
    return this.prisma.dnsServerConfig.delete({ where: { id } });
  }

  async getAllBlocklistsAdmin() {
    return this.prisma.blocklistConfig.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async createBlocklist(data: {
    name: string;
    url: string;
    category?: string;
    description?: string;
    ruleCount?: number;
    isEnabled?: boolean;
    order?: number;
  }) {
    return this.prisma.blocklistConfig.create({
      data: {
        name: data.name,
        url: data.url,
        category: data.category || 'ADS',
        description: data.description || null,
        ruleCount: data.ruleCount || 0,
        isEnabled: data.isEnabled !== undefined ? data.isEnabled : true,
        order: data.order || 0,
      },
    });
  }

  async updateBlocklist(id: string, data: Partial<{
    name: string;
    url: string;
    category: string;
    description: string;
    ruleCount: number;
    isEnabled: boolean;
    order: number;
  }>) {
    const existing = await this.prisma.blocklistConfig.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Blocklist feed config not found');
    return this.prisma.blocklistConfig.update({
      where: { id },
      data,
    });
  }

  async deleteBlocklist(id: string) {
    const existing = await this.prisma.blocklistConfig.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Blocklist feed config not found');
    return this.prisma.blocklistConfig.delete({ where: { id } });
  }
}

