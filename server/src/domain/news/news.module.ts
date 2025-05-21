import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController, NewsPublicController } from './news.controller';
import { LogsModule } from '../logs/logs.module';
import { CacheModule } from '../cache/cache.module';
import { FsModule } from '../fs/fs.module';
import { SettingsModule } from '../settings/settings.module';
import { SupportModule } from '../support/support.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    LogsModule,
    CacheModule,
    FsModule,
    SettingsModule,
    SupportModule,
    PrismaModule,
  ],
  providers: [NewsService],
  controllers: [NewsController, NewsPublicController],
})
export class NewsModule {}
