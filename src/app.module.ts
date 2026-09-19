import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TelemetryModule } from './telemetry/telemetry.module';
import { RemoteConfigModule } from './config/remote-config.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { join } from 'path';
import * as fs from 'fs';

// Resolve static path for compiled Vue frontend
const possibleDistPaths = [
  join(process.cwd(), '../DNSly-frontend/dist'),
  join(__dirname, '../../DNSly-frontend/dist'),
  join(__dirname, '../public'),
  join(process.cwd(), 'public'),
];

let resolvedStaticPath = possibleDistPaths[0];
for (const p of possibleDistPaths) {
  if (fs.existsSync(p)) {
    resolvedStaticPath = p;
    break;
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolvedStaticPath,
      exclude: ['/api/(.*)', '/reference/(.*)', '/docs/(.*)', '/openapi.json'],
      serveStaticOptions: {
        index: 'index.html',
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('THROTTLE_TTL', 60000),
          limit: config.get<number>('THROTTLE_LIMIT', 120),
        },
      ],
    }),
    PrismaModule,
    AuthModule,
    TelemetryModule,
    RemoteConfigModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
