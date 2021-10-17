import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fs = require('fs');

import * as bodyParser from 'body-parser';

const MAX_REQUEST_SIZE = `${50}mb`;
const PORT = 60045;

const options = {
  // httpsOptions: {
  //   key: fs.readFileSync('../../certs/key.pem'),
  //   cert: fs.readFileSync('../../certs/privkey.pem')
  // }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  app.use(bodyParser.json({ limit: MAX_REQUEST_SIZE }));
  app.use(bodyParser.urlencoded({ limit: MAX_REQUEST_SIZE, extended: true }));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();