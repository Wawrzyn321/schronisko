import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fs = require('fs');

import * as bodyParser from 'body-parser';

const MAX_REQUEST_SIZE = `${50}mb`;
const PORT = 60045;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('/var/www/schronisko/backend/certs/key.pem'),
      cert: fs.readFileSync('/var/www/schronisko/backend/certs/cert.pem')
    }
  });
  app.use(bodyParser.json({ limit: MAX_REQUEST_SIZE }));
  app.use(bodyParser.urlencoded({ limit: MAX_REQUEST_SIZE, extended: true }));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();