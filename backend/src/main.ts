import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

const MAX_REQUEST_SIZE = `${50}mb`;
const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: MAX_REQUEST_SIZE }));
  app.use(bodyParser.urlencoded({ limit: MAX_REQUEST_SIZE, extended: true }));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
