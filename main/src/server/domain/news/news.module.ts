import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { NewsService } from './news.service';
import { NewsController, NewsPublicController } from './news.controller';
import { LogsService } from '../logs/logs.service';
import { SettingsService } from './../settings/settings.service';

@Module({
  providers: [NewsService, PrismaService, LogsService, SettingsService],
  exports: [NewsService],
  controllers: [NewsController, NewsPublicController],
})
export class NewsModule { }
