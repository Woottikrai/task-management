import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded({ extended: true, limit: '50mb' })); //solution to add image
  app.use(json({ limit: '50mb' })); //solution to add image #thanawat
  const config = new DocumentBuilder()
    .setTitle('Task-management')
    .addTag('Task-management')
    .setDescription('This is API Task-management')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.enableCors();
  await app.listen(3001);
  console.log('Start at ::', await app.getUrl());
}
bootstrap();
