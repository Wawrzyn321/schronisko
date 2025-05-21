import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { NewsService } from './news.service';
import { NewsController, NewsPublicController } from './news.controller';
import { LogsModule } from '../logs/logs.module';
import { CacheModule } from '../cache/cache.module';
import { FsModule } from '../fs/fs.module';
import { SettingsModule } from '../settings/settings.module';
import { SupportModule } from '../support/support.module';

@Module({
  imports: [LogsModule, CacheModule, FsModule, SettingsModule, SupportModule],
  providers: [NewsService, PrismaService],
  controllers: [NewsController, NewsPublicController],
})
export class NewsModule {}
