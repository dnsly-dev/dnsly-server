import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const parseCookie = typeof cookieParser === 'function' ? cookieParser : (cookieParser as any).default;
  if (typeof parseCookie === 'function') {
    app.use(parseCookie());
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

  // Mount Scalar API Reference UI
  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'purple',
      darkMode: true,
    }),
  );

  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'purple',
      darkMode: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`=========================================`);
  console.log(`🛡️ DNSly Server running on port ${port}`);
  console.log(`📄 Scalar API Docs: http://localhost:${port}/reference`);
  console.log(`=========================================`);
}
bootstrap();
