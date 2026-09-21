import { Controller, Post, Get, Body, Res, Req, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response, Request } from 'express';

@ApiTags('Admin Auth')
@Controller('api/v1/admin/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login endpoint with HttpOnly cookie session (rate-limited)' })
  @ApiResponse({ status: 200, description: 'Authentication successful, sets admin_token cookie and returns user profile' })
  async login(@Body() loginDto: AdminLoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(loginDto);

    // Set secure HTTP-only cookie for web dashboard
    const isProduction = process.env.NODE_ENV === 'production';
    response.cookie('admin_token', result.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return result;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated admin user profile via HttpOnly cookie or bearer token' })
  @ApiResponse({ status: 200, description: 'Current admin user info' })
  async me(@Req() request: Request & { user: any }) {
    return {
      authenticated: true,
      user: request.user,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin logout endpoint' })
  async logout(@Res({ passthrough: true }) response: Response) {
    const isProduction = process.env.NODE_ENV === 'production';
    response.clearCookie('admin_token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });
    return { success: true, message: 'Logged out successfully' };
  }
}
