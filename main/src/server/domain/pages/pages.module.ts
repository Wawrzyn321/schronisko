import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController, PagesPublicController } from './pages.controller';
import { LogsService } from '../logs/logs.service';
import { SettingsService } from '../settings/settings.service';

@Module({
  providers: [PagesService, PrismaService, LogsService, SettingsService],
  exports: [PagesService],
  controllers: [PagesController, PagesPublicController],
})
export class PagesModule {}
