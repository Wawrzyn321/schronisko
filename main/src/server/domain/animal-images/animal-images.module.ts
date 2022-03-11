import { PrismaService } from 'prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { AnimalImagesService } from './animal-images.service';
import {
  AnimalImagesController,
  AnimalImagesPublicController,
} from './animal-images.controller';

@Module({
  providers: [AnimalImagesService, PrismaService],
  exports: [AnimalImagesService],
  controllers: [AnimalImagesController, AnimalImagesPublicController],
})
export class AnimalImagesModule {}
