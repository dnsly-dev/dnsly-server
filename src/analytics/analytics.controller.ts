import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get paginated list of client devices' })
  @ApiResponse({ status: 200, description: 'Paginated list of active and total devices' })
  async getDevices(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.analyticsService.getDevicesList(parseInt(page, 10), parseInt(limit, 10));
  }
}
