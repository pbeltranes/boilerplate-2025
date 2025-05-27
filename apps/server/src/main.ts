import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita CORS
  app.enableCors({
    origin: 'http://localhost:3000', // o true si quieres permitir todo
    credentials: true, // si estás usando cookies
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
