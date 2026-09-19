import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { RemoteConfigService } from './remote-config.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Remote Config')
@Controller('api/v1')
export class RemoteConfigController {
  constructor(private configService: RemoteConfigService) {}

  // ─── Public Client Endpoints ───
  @Get('config/dns-servers')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Get active curated DNS servers list (Client API)' })
  @ApiHeader({ name: 'x-api-key', description: 'Client authentication API key', required: true })
  @ApiResponse({ status: 200, description: 'List of active DNS servers' })
  async getDnsServers() {
    const servers = await this.configService.getDnsServers();
    return {
      version: Date.now(),
      servers,
    };
  }

  @Get('config/blocklists')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Get active curated blocklist feeds list (Client API)' })
  @ApiHeader({ name: 'x-api-key', description: 'Client authentication API key', required: true })
  @ApiResponse({ status: 200, description: 'List of active blocklist feeds' })
  async getBlocklists() {
    const feeds = await this.configService.getBlocklists();
    return {
      version: Date.now(),
      feeds,
    };
  }

  // ─── Admin Management Endpoints ───
  @Get('admin/config/dns-servers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all DNS servers for admin management' })
  async getAllDnsServersAdmin() {
    return this.configService.getAllDnsServersAdmin();
  }

  @Post('admin/config/dns-servers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new DNS server configuration' })
  async createDnsServer(@Body() data: any) {
    return this.configService.createDnsServer(data);
  }

  @Put('admin/config/dns-servers/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update or toggle a DNS server configuration' })
  async updateDnsServer(@Param('id') id: string, @Body() data: any) {
    return this.configService.updateDnsServer(id, data);
  }

  @Delete('admin/config/dns-servers/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a DNS server configuration' })
  async deleteDnsServer(@Param('id') id: string) {
    return this.configService.deleteDnsServer(id);
  }

  @Get('admin/config/blocklists')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all blocklists for admin management' })
  async getAllBlocklistsAdmin() {
    return this.configService.getAllBlocklistsAdmin();
  }

  @Post('admin/config/blocklists')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blocklist configuration' })
  async createBlocklist(@Body() data: any) {
    return this.configService.createBlocklist(data);
  }

  @Put('admin/config/blocklists/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update or toggle a blocklist configuration' })
  async updateBlocklist(@Param('id') id: string, @Body() data: any) {
    return this.configService.updateBlocklist(id, data);
  }

  @Delete('admin/config/blocklists/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a blocklist configuration' })
  async deleteBlocklist(@Param('id') id: string) {
    return this.configService.deleteBlocklist(id);
  }
}

