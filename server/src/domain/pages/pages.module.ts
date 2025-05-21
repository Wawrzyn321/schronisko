import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { LogsService } from '../logs/logs.service';
import { SettingsService } from '../settings/settings.service';
import { CacheService } from '../cache/cache.service';
import { SanitizeService } from '../support/sanitize.service';
import { CacheServiceInterface } from '../../domain/cache/interface';
import { FsServiceInterface } from '../fs/interface';
import { FsService } from '../fs/fs.service';

@Module({
  providers: [
    PagesService,
    PrismaService,
    LogsService,
    SettingsService,
    {
      provide: CacheServiceInterface,
      useClass: CacheService,
    },
    {
      provide: FsServiceInterface,
      useClass: FsService,
    },
    SanitizeService,
  ],
  exports: [],
  controllers: [PagesController],
})
export class PagesModule {}
