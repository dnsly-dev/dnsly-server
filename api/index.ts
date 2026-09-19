import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

const server = express();
let isInitialized = false;

async function bootstrapServerless() {
  if (!isInitialized) {
    const parseCookie = typeof cookieParser === 'function' ? cookieParser : (cookieParser as any).default;
    if (typeof parseCookie === 'function') {
      server.use(parseCookie());
    }

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

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

    server.use(
      '/reference',
      apiReference({
        spec: {
          content: document,
        },
        theme: 'purple',
        darkMode: true,
      }),
    );

    server.use(
      '/docs',
      apiReference({
        spec: {
          content: document,
        },
        theme: 'purple',
        darkMode: true,
      }),
    );

    await app.init();
    isInitialized = true;
  }
  return server;
}

export default async function handler(req: Request, res: Response) {
  await bootstrapServerless();
  server(req, res);
}
