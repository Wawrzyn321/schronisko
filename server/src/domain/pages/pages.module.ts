import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
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
  providers: [PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
