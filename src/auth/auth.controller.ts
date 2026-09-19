import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/login.dto';
import { Response } from 'express';

@ApiTags('Admin Auth')
@Controller('api/v1/admin/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login endpoint' })
  @ApiResponse({ status: 200, description: 'Authentication successful, returns JWT token' })
  async login(@Body() loginDto: AdminLoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(loginDto);

    // Set HTTP-only cookie for web dashboard
    response.cookie('admin_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return result;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin logout endpoint' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('admin_token');
    return { success: true, message: 'Logged out successfully' };
  }
}
