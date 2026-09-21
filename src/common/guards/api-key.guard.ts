import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKeyHeader = request.headers['x-api-key'];
    const validApiKey = this.configService.get<string>('CLIENT_API_KEY', 'dnsly-client-sec-2026');

    if (!apiKeyHeader || typeof apiKeyHeader !== 'string') {
      throw new UnauthorizedException('Invalid or missing x-api-key header');
    }

    // Timing-safe buffer comparison to prevent timing side-channel attacks
    const headerBuffer = Buffer.from(apiKeyHeader);
    const validKeyBuffer = Buffer.from(validApiKey);

    if (headerBuffer.length !== validKeyBuffer.length || !crypto.timingSafeEqual(headerBuffer, validKeyBuffer)) {
      throw new UnauthorizedException('Invalid or missing x-api-key header');
    }

    return true;
  }
}
