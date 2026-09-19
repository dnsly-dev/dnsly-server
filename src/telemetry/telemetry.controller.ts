import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { TelemetryService } from './telemetry.service';
import { HeartbeatDto } from './dto/heartbeat.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Telemetry')
@Controller('api/v1/telemetry')
export class TelemetryController {
  constructor(private telemetryService: TelemetryService) {}

  @Post('heartbeat')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Record anonymous client device heartbeat & query statistics' })
  @ApiHeader({ name: 'x-api-key', description: 'Client authentication API key', required: true })
  @ApiResponse({ status: 200, description: 'Heartbeat ingested successfully' })
  async recordHeartbeat(@Body() dto: HeartbeatDto) {
    return this.telemetryService.processHeartbeat(dto);
  }
}
