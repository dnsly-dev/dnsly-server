import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { RemoteConfigService } from './remote-config.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Remote Config')
@Controller('api/v1/config')
export class RemoteConfigController {
  constructor(private configService: RemoteConfigService) {}

  @Get('dns-servers')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Get active curated DNS servers list' })
  @ApiHeader({ name: 'x-api-key', description: 'Client authentication API key', required: true })
  @ApiResponse({ status: 200, description: 'List of active DNS servers' })
  async getDnsServers() {
    const servers = await this.configService.getDnsServers();
    return {
      version: Date.now(),
      servers,
    };
  }

  @Get('blocklists')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Get active curated blocklist feeds list' })
  @ApiHeader({ name: 'x-api-key', description: 'Client authentication API key', required: true })
  @ApiResponse({ status: 200, description: 'List of active blocklist feeds' })
  async getBlocklists() {
    const feeds = await this.configService.getBlocklists();
    return {
      version: Date.now(),
      feeds,
    };
  }
}
