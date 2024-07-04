import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './common/cors/cors';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(morgan('dev'));
  app.enableCors(CORS);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const port = configService.get<number>('PORT');
  await app.listen(port);
  console.log(`⚡📱 Application running on port ${port} ...`);
}
bootstrap();
