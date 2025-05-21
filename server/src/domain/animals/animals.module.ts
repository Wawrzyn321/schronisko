import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import {
  AnimalsController,
  AnimalsPublicController,
} from './animals.controller';
import { LogsModule } from '../logs/logs.module';
import { FsModule } from '../fs/fs.module';
import { AnimalImagesModule } from '../animal-images/animal-images.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [LogsModule, FsModule, AnimalImagesModule, PrismaModule],
  providers: [AnimalsService],
  exports: [],
  controllers: [AnimalsController, AnimalsPublicController],
})
export class AnimalsModule {}
