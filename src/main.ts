import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded({ extended: true, limit: '50mb' })); //solution to add image
  const config = new DocumentBuilder()
    .setTitle('Task-management')
    .setDescription('This is API Task-management')
    .setVersion('1.0')
    .addTag('Task-management')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3001);
  console.log('Start at ::', await app.getUrl());
}
bootstrap();
