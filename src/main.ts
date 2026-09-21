import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupScalarDocs } from './scalar.util';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cookieMiddleware: any = (cookieParser as any)?.default || cookieParser;
  if (typeof cookieMiddleware === 'function') {
    app.use(cookieMiddleware());
  }

  // Global Validation Pipe for Request DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Security Headers Middleware
  app.use((req: any, res: any, next: any) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Dynamic CORS origin whitelist: supports localhost, custom configured origin, and production domains
  const allowedOriginsEnv = process.env.CORS_ALLOWED_ORIGINS || '';
  const parsedAllowedOrigins = allowedOriginsEnv
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, native HTTP clients)
      if (!origin) return callback(null, true);

      // Check if origin matches localhost, 127.0.0.1, or local networks
      const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      // Check if origin matches production domains or explicitly allowed origins
      const isConfigured = parsedAllowedOrigins.includes(origin);
      const isDefaultAllowed =
        origin.endsWith('dnsly.app') ||
        origin.endsWith('shovon.bd') ||
        origin.endsWith('.vercel.app');

      if (isLocalhost || isConfigured || isDefaultAllowed || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'X-Requested-With'],
  });

  // OpenAPI Specification for Scalar Reference
  const swaggerConfig = new DocumentBuilder()
    .setTitle('DNSly Backend API')
    .setDescription('DNSly telemetry ingestion, remote configs, admin analytics & device management API')
    .setVersion('1.0.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Mount Scalar API Reference UI (supports /reference, /docs, /api/docs, /openapi.json)
  setupScalarDocs(app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`=========================================`);
  console.log(`🛡️ DNSly Server running on port ${port}`);
  console.log(`📄 Scalar API Docs: http://localhost:${port}/reference`);
  console.log(`=========================================`);
}
bootstrap();
