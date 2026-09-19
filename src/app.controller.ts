import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  getRoot(@Res() res: Response) {
    return res.json({
      name: 'DNSly Backend API',
      status: 'healthy',
      version: '1.0.0',
      dashboard: '/admin',
      documentation: '/api/docs',
      timestamp: new Date().toISOString(),
    });
  }
}
