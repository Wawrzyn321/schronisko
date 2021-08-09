import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { LogsService } from '../logs/logs.service';

@Module({
  providers: [AnimalsService, PrismaService, LogsService],
  exports: [AnimalsService],
  controllers: [AnimalsController],
})
export class AnimalsModule {}
