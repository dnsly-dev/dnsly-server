import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cookie parser for admin dashboard authentication
  app.use(cookieParser());

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

  // Swagger OpenAPI Documentation Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('DNSly Backend API')
    .setDescription('DNSly telemetry ingestion, remote configs, admin analytics & device management API')
    .setVersion('1.0.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`=========================================`);
  console.log(`🛡️ DNSly Server running on port ${port}`);
  console.log(`📄 Swagger Docs: http://localhost:${port}/api/docs`);
  console.log(`📊 Admin Dashboard: http://localhost:${port}/admin`);
  console.log(`=========================================`);
}
bootstrap();
