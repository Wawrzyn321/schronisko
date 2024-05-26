import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { LogsService } from '../logs/logs.service';
import { CacheService } from '../cache/cache.service';
import { SanitizeService } from '../support/sanitize.service';

@Module({
  providers: [
    SettingsService,
    PrismaService,
    LogsService,
    CacheService,
    SanitizeService,
  ],
  exports: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
