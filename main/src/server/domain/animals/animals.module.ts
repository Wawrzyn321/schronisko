import { PrismaService } from 'prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import {
  AnimalsController,
  AnimalsPublicController,
} from './animals.controller';
import { LogsService } from '../logs/logs.service';
import { AnimalImagesService } from '../animal-images/animal-images.service';

@Module({
  providers: [AnimalsService, PrismaService, LogsService, AnimalImagesService],
  exports: [AnimalsService],
  controllers: [AnimalsController, AnimalsPublicController],
})
export class AnimalsModule {}
