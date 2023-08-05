import { Module } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { PagesModule } from './domain/pages/pages.module';
import { NewsModule } from './domain/news/news.module';
import { AnimalsModule } from './domain/animals/animals.module';
import { AnimalImagesModule } from './domain/animal-images/animal-images.module';
import { LogsModule } from './domain/logs/logs.module';
import { SettingsModule } from './domain/settings/settings.module';
import { CommunicationModule } from './domain/communication/communication.module';
import { ConfigModule } from '@nestjs/config';

export const LOCAL_STATIC_FILES_PATH = '../images/';

const DEV = process.env.NODE_ENV !== 'production';

export const WEB_STATIC_FILES_PATH = DEV
  ? 'http://localhost:60045'
  : 'https://schronisko-backend.oto-jest-wawrzyn.pl';

const animalsPath = path.join(LOCAL_STATIC_FILES_PATH, 'img/animals');
const newsPath = path.join(LOCAL_STATIC_FILES_PATH, 'img/news');
if (!fs.existsSync(animalsPath)) {
  fs.mkdirSync(animalsPath, { recursive: true });
}
if (!fs.existsSync(newsPath)) {
  fs.mkdirSync(newsPath, { recursive: true });
}

const domainModules = [
  AuthModule,
  UsersModule,
  PagesModule,
  NewsModule,
  AnimalsModule,
  AnimalImagesModule,
  LogsModule,
  SettingsModule,
  CommunicationModule,
];

@Module({
  imports: [...domainModules, ConfigModule.forRoot()],
})
export class AppModule {}
