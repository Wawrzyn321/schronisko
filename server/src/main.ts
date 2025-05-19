import './sentry';
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as Sentry from '@sentry/node';

import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MAX_REQUEST_SIZE, PORT } from './config';

const DEV = process.env.NODE_ENV !== 'production';

export const USE_HTTP = false;

if (!process.env.POSTMARK_API_TOKEN) {
  throw Error('POSTMARK_API_TOKEN is required');
}
if (!process.env.RECAPTCHA_SECRET_KEY) {
  throw Error('RECAPTCHA_SECRET_KEY is required');
}
if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
  throw Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is required');
}

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
  const pepper = process.env.PEPPER ?? '';
  if (!pepper.length) {
    console.error('No pepper provided. Exiting.');
    process.exit(1);
  }

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

  if (!DEV) {
    const { httpAdapter } = app.get(HttpAdapterHost);
    Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));
  }

  await app.listen(PORT);
}
bootstrap();
