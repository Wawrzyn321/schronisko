import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { LogsModule } from '../logs/logs.module';
import { CacheModule } from '../cache/cache.module';
import { SupportModule } from '../support/support.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    LogsModule,
    CacheModule,
    SettingsModule,
    SupportModule,
    PrismaModule,
  ],
  providers: [SettingsService],
  exports: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
