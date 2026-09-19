import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({ example: 'admin@dnsly.app', description: 'Admin email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Admin@DNSly2026', description: 'Admin password' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
