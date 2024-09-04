import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for all origins and all methods
  app.enableCors({
    origin: '*', // Allow all origins
    methods: '*', // Allow all methods
    credentials: true,
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  await app.listen(8080);
}
bootstrap();
