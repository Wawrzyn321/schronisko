import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

const MAX_REQUEST_SIZE = `${50}mb`;
const PORT = 60045;

const DEV = process.env.NODE_ENV !== 'production';

export const USE_HTTP = false;

let options = {};
if (!DEV && USE_HTTP) {
  options = {
    httpsOptions: {
      key: fs.readFileSync('/var/svc/certs/privkey.pem'),
      cert: fs.readFileSync('/var/svc/certs/cert.pem'),
    },
  };
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    options,
  );
  app.use(bodyParser.json({ limit: MAX_REQUEST_SIZE }));
  app.useStaticAssets(path.join(__dirname, '../..', 'images'), {
    index: false,
    extensions: ['.png', '.jpeg', '.jpg', '.gif'],
  });
  app.use(bodyParser.urlencoded({ limit: MAX_REQUEST_SIZE, extended: true }));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();