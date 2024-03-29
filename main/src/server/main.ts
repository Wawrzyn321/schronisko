import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

import * as bodyParser from 'body-parser';

const MAX_REQUEST_SIZE = `${50}mb`;
const PORT = 60045;

const DEV = process.env.NODE_ENV !== 'production';

if (!fs.existsSync('src/client/public/img/news')) {
  fs.mkdirSync('src/client/public/img/news', { recursive: true });
}
if (!fs.existsSync('src/client/public/img/animals/pics')) {
  fs.mkdirSync('src/client/public/img/animals/pics', { recursive: true });
}

let options = {};
if (!DEV) {
  options = {
    httpsOptions: {
      key: fs.readFileSync('/var/svc/certs/privkey.pem'),
      cert: fs.readFileSync('/var/svc/certs/cert.pem'),
    },
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  app.use(bodyParser.json({ limit: MAX_REQUEST_SIZE }));
  app.use(bodyParser.urlencoded({ limit: MAX_REQUEST_SIZE, extended: true }));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
