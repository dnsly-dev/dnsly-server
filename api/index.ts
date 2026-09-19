import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express, { Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';

const server = express();
let isInitialized = false;

async function bootstrapServerless() {
  if (!isInitialized) {
    server.use(cookieParser());
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

    // Swagger OpenAPI setup for Serverless
    const swaggerConfig = new DocumentBuilder()
      .setTitle('DNSly Backend API')
      .setDescription('DNSly telemetry ingestion, remote configs, admin analytics & device management API')
      .setVersion('1.0.0')
      .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    await app.init();
    isInitialized = true;
  }
  return server;
}

export default async function handler(req: Request, res: Response) {
  await bootstrapServerless();
  server(req, res);
}
