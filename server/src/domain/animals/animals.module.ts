import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import {
  AnimalsController,
  AnimalsPublicController,
} from './animals.controller';
import { LogsModule } from '../logs/logs.module';
import { FsModule } from '../fs/fs.module';
import { AnimalImagesModule } from '../animal-images/animal-images.module';

@Module({
  imports: [LogsModule, FsModule, AnimalImagesModule],
  providers: [AnimalsService, PrismaService],
  exports: [],
  controllers: [AnimalsController, AnimalsPublicController],
})
export class AnimalsModule {}
