import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class HeartbeatDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'Anonymous client device UUID' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({ example: '1.0.0-beta', description: 'DNSly Android app version' })
  @IsString()
  @IsNotEmpty()
  appVersion: string;

  @ApiProperty({ example: 'Cloudflare (Default)', description: 'Currently active upstream DNS provider' })
  @IsString()
  @IsNotEmpty()
  selectedProvider: string;

  @ApiProperty({ example: true, description: 'Whether Ad & Tracker Shield is enabled' })
  @IsBoolean()
  shieldEnabled: boolean;

  @ApiProperty({ example: 1420, description: 'Total DNS queries processed in the last 24 hours' })
  @IsNumber()
  @Min(0)
  totalQueries: number;

  @ApiProperty({ example: 180, description: 'Total DNS queries blocked in the last 24 hours' })
  @IsNumber()
  @Min(0)
  blockedQueries: number;

  @ApiProperty({ example: 'Samsung Galaxy S24 Ultra', required: false, description: 'Device manufacturer and model' })
  @IsOptional()
  @IsString()
  deviceModel?: string;

  @ApiProperty({ example: 'Android 14 (API 34)', required: false, description: 'Android OS version and API level' })
  @IsOptional()
  @IsString()
  osVersion?: string;

  @ApiProperty({ example: 'US', required: false, description: 'Two-letter ISO country code' })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @ApiProperty({ example: 'arm64-v8a', required: false, description: 'CPU ABI architecture' })
  @IsOptional()
  @IsString()
  cpuArch?: string;

  @ApiProperty({ example: 1726725600000, required: false, description: 'Epoch millisecond timestamp' })
  @IsOptional()
  @IsNumber()
  timestamp?: number;
}
