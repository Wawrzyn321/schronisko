import { PrismaService } from './prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { JwtAuthGuard } from './domain/auth/jwt-auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { PagesModule } from './domain/pages/pages.module';
import { NewsModule } from './domain/news/news.module';
import { AnimalsModule } from './domain/animals/animals.module';
import { AnimalImagesModule } from './domain/animal-images/animal-images.module';
import { LogsModule } from './domain/logs/logs.module';
import { SettingsModule } from './domain/settings/settings.module';
import { ViewModule } from './domain/view/view.module'

export const STATIC_FILES_PATH = 'src/client/public/img';

const domainModules = [AuthModule, UsersModule, PagesModule, NewsModule, AnimalsModule, AnimalImagesModule, LogsModule, SettingsModule];
const ServeStatic = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', STATIC_FILES_PATH),
  serveStaticOptions: {
    index: false,
    extensions: ['.png'], //todo
  },
  //exclude: ['/api*'],
});

const JwtGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
@Module({
  imports: [...domainModules, ViewModule, ServeStatic],
  controllers: [AppController],
  providers: [PrismaService, JwtGuard]
})
export class AppModule { }