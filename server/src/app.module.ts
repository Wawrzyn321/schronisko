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

export const LOCAL_STATIC_FILES_PATH = '../images/';

const DEV = process.env.NODE_ENV !== 'production';

export const WEB_STATIC_FILES_PATH = DEV
  ? 'http://localhost:60045'
  : 'http://schronisko-backend2.oto-jest-wawrzyn.pl';

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

const supportModules = [
  // todo niefajnie
  CacheModule,
  SupportModule,
];

@Module({
  imports: [...domainModules, ...supportModules, ConfigModule.forRoot()],
})
export class AppModule {}
