import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import 'dotenv/config';
import { sessionMiddleware } from './common/middlewares/session.middleware';

//TODO  Helmet middleware for securing your app by setting various HTTP headers
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin:"*"
  });
  app.use(
    sessionMiddleware
  );
  // Use global validation pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Start the application on port 3000 (you can change it based on your preference)
  await app.listen(3000);
}

bootstrap();