import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { LogsModule } from '../logs/logs.module';
import { CacheModule } from '../cache/cache.module';
import { SupportModule } from '../support/support.module';

@Module({
  imports: [LogsModule, CacheModule, SettingsModule, SupportModule],
  providers: [SettingsService, PrismaService],
  exports: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
