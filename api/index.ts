import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupScalarDocs } from '../src/scalar.util';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

const server = express();
let serverPromise: Promise<express.Express> | null = null;

async function bootstrapServerless(): Promise<express.Express> {
  if (!serverPromise) {
    serverPromise = (async () => {
      const cookieMiddleware: any = (cookieParser as any)?.default || cookieParser;
      if (typeof cookieMiddleware === 'function') {
        server.use(cookieMiddleware());
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

      // Mount Scalar API Reference UI on serverless express app
      setupScalarDocs(server, document);

      await app.init();
      return server;
    })();
  }
  return serverPromise;
}

export default async function handler(req: Request, res: Response) {
  try {
    const expressApp = await bootstrapServerless();
    expressApp(req, res);
  } catch (err: any) {
    console.error('CRITICAL VERCEL BOOTSTRAP FAILURE:', err);
    res.status(500).json({
      statusCode: 500,
      message: 'Serverless Function Invocation Failed',
      error: err?.message || String(err),
    });
  }
}
