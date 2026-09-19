import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('api')
export class AppController {
  @Get('health')
  @ApiExcludeEndpoint()
  getHealth(@Res() res: Response) {
    return res.json({
      name: 'DNSly Backend API',
      status: 'healthy',
      version: '1.0.0',
      documentation: '/reference',
      timestamp: new Date().toISOString(),
    });
  }

  @Get()
  @ApiExcludeEndpoint()
  getApiRoot(@Res() res: Response) {
    return res.json({
      name: 'DNSly Backend API Gateway',
      status: 'active',
      version: '1.0.0',
      documentation: '/reference',
      endpoints: {
        telemetry: '/api/v1/telemetry/heartbeat',
        auth: '/api/v1/admin/auth/login',
        analytics: '/api/v1/admin/analytics/overview',
        devices: '/api/v1/admin/analytics/devices',
        dnsServers: '/api/v1/config/dns-servers',
        blocklists: '/api/v1/config/blocklists',
      },
    });
  }
}
