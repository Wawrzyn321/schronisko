import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { LogsService } from '../logs/logs.service';

@Module({
  providers: [NewsService, PrismaService, LogsService],
  exports: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
