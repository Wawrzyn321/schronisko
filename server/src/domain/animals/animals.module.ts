import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import {
  AnimalsController,
  AnimalsPublicController,
} from './animals.controller';
import { LogsService } from '../logs/logs.service';
import { AnimalImagesService } from '../animal-images/animal-images.service';
import { FsServiceInterface } from '../fs/interface';
import { FsService } from '../fs/fs.service';

@Module({
  providers: [
    AnimalsService,
    PrismaService,
    LogsService,
    AnimalImagesService,
    {
      provide: FsServiceInterface,
      useClass: FsService,
    },
  ],
  exports: [AnimalsService],
  controllers: [AnimalsController, AnimalsPublicController],
})
export class AnimalsModule {}
