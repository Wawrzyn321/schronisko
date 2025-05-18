import { Module } from '@nestjs/common';

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
import { CacheModule } from './domain/cache/cache.module';
import { setupImageDirectories } from './util/setupImageDIrectories';
import { SupportModule } from './domain/support/support.module';
import { PORT } from './config';

export const LOCAL_STATIC_FILES_PATH = '../images/';

const DEV = process.env.NODE_ENV !== 'production';

const NEXT_PUBLIC_SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

function getStaticFilesPath() {
  if (DEV) {
    return `http://localhost:${PORT}`;
  }

  if (!NEXT_PUBLIC_SERVER_DOMAIN) {
    throw Error('NEXT_PUBLIC_SERVER_DOMAIN is required');
  }
  return NEXT_PUBLIC_SERVER_DOMAIN;
}

export const WEB_STATIC_FILES_PATH = getStaticFilesPath();

setupImageDirectories(LOCAL_STATIC_FILES_PATH);

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

const supportModules = [CacheModule, SupportModule];

@Module({
  imports: [...domainModules, ...supportModules, ConfigModule.forRoot()],
})
export class AppModule {}
