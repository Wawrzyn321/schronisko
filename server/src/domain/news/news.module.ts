import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { NewsService } from './news.service';
import { NewsController, NewsPublicController } from './news.controller';
import { LogsService } from '../logs/logs.service';
import { SettingsService } from '../settings/settings.service';
import { CacheService } from '../cache/cache.service';
import { SanitizeService } from '../support/sanitize.service';

@Module({
  providers: [
    NewsService,
    PrismaService,
    LogsService,
    SettingsService,
    CacheService,
    SanitizeService,
  ],
  exports: [NewsService],
  controllers: [NewsController, NewsPublicController],
})
export class NewsModule {}
