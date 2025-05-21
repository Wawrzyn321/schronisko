import { Module } from '@nestjs/common';

import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { PagesModule } from './domain/pages/pages.module';
import { NewsModule } from './domain/news/news.module';
import { AnimalsModule } from './domain/animals/animals.module';
import { AnimalImagesModule } from './domain/animal-images/animal-images.module';
import { LogsModule } from './domain/logs/logs.module';
import { SettingsModule } from './domain/settings/settings.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

const domainModules = [
  UsersModule,
  AuthModule,
  PagesModule,
  NewsModule,
  AnimalsModule,
  AnimalImagesModule,
  LogsModule,
  SettingsModule,
];

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
  cache: true,
});

@Module({
  imports: [...domainModules, configModule],
})
export class AppModule {}
