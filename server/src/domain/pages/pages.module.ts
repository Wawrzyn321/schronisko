import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { LogsModule } from '../logs/logs.module';
import { CacheModule } from '../cache/cache.module';
import { FsModule } from '../fs/fs.module';
import { SettingsModule } from '../settings/settings.module';
import { SupportModule } from '../support/support.module';

@Module({
  imports: [LogsModule, CacheModule, FsModule, SettingsModule, SupportModule],
  providers: [PagesService, PrismaService],
  controllers: [PagesController],
})
export class PagesModule {}
