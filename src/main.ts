import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  })
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`App runing on port ${ process.env.PORT }`);
  console.log('vamos a ver si se actualiza bien')
}
bootstrap();
