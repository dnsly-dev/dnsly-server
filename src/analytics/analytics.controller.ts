import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Admin Analytics')
@Controller('api/v1/admin/analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get overview dashboard KPI metrics (DAU, query counts, threat rate)' })
  @ApiResponse({ status: 200, description: 'Aggregated analytics metrics' })
  async getOverview() {
    return this.analyticsService.getOverviewMetrics();
  }

  @Get('devices')
  @ApiOperation({ summary: 'Get paginated list of client devices with filters' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 20, max: 100)', example: 20 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term for device ID, model, OS, or country' })
  @ApiQuery({ name: 'shieldEnabled', required: false, type: String, description: 'Filter by shield status ("true" | "false")' })
  @ApiQuery({ name: 'provider', required: false, type: String, description: 'Filter by DNS provider name' })
  @ApiResponse({ status: 200, description: 'Paginated list of active and total devices' })
  async getDevices(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('shieldEnabled') shieldEnabled?: string,
    @Query('provider') provider?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.analyticsService.getDevicesList(
      Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1,
      Number.isInteger(limitNum) && limitNum > 0 ? limitNum : 20,
      search,
      shieldEnabled,
      provider,
    );
  }

  @Get('heartbeats')
  @ApiOperation({ summary: 'Get paginated telemetry heartbeats stream with search and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of heartbeats per page (default: 20, max: 100)', example: 20 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term for device UUID, model, or provider' })
  @ApiQuery({ name: 'shieldEnabled', required: false, type: String, description: 'Filter by shield status ("true" | "false")' })
  @ApiQuery({ name: 'provider', required: false, type: String, description: 'Filter by DNS provider name' })
  @ApiResponse({ status: 200, description: 'Paginated telemetry heartbeats' })
  async getHeartbeats(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('shieldEnabled') shieldEnabled?: string,
    @Query('provider') provider?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.analyticsService.getHeartbeatsPaginated(
      Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1,
      Number.isInteger(limitNum) && limitNum > 0 ? limitNum : 20,
      search,
      shieldEnabled,
      provider,
    );
  }
}
