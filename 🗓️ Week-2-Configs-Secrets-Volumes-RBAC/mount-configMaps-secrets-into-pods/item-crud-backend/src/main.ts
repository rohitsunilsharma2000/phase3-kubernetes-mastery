import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(`Server is running on port ${process.env.PORT ?? 3001}`);

  console.log(`App Name: ${process.env.APP_NAME}`);
  console.log(`Log Level: ${process.env.LOG_LEVEL}`);
  console.log(`Secret Key: ${process.env.API_SECRET_KEY}`);

}
bootstrap();
