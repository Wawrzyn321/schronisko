import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { LogsService } from '../logs/logs.service';

@Module({
  providers: [PagesService, PrismaService, LogsService],
  exports: [PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
