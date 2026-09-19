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

  // Enable CORS for mobile app requests and web dashboards
  app.enableCors({
    origin: true,
    credentials: true,
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
