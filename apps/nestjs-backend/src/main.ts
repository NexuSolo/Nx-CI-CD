/**
 * NestJS gRPC Microservice
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { join } from 'path';

async function bootstrap() {
  // Créer l'application HTTP classique pour le front-end
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });
  
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  
  // Ajouter le microservice gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../../../proto/user.proto'),
      url: 'localhost:5000',
    },
  });

  await app.startAllMicroservices();
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  Logger.log(`🚀 HTTP Server is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🔌 gRPC Microservice is running on: localhost:5000`);
}

bootstrap();
