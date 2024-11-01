import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 //Habilitar CORS para permitir requisições do frontend Next.js (localhost:3000)
  app.enableCors(); // Habilita o CORS para permitir requisições de diferentes origens


  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
