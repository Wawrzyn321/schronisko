import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { LogsService } from '../logs/logs.service';
import { CacheService } from '../cache/cache.service';
import { SanitizeService } from '../support/sanitize.service';
import { CacheServiceInterface } from '../../domain/cache/interface';

@Module({
  providers: [
    SettingsService,
    PrismaService,
    LogsService,
    {
      provide: CacheServiceInterface,
      useClass: CacheService,
    },
    SanitizeService,
  ],
  exports: [],
  controllers: [SettingsController],
})
export class SettingsModule {}
