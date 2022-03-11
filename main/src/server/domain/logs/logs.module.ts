import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { PrismaService } from 'prisma-connect/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [LogsService, PrismaService],
  exports: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
