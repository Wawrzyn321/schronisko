import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { AnimalImagesService } from './animal-images.service';
import { AnimalImagesController } from './animal-images.controller';

@Module({
  providers: [AnimalImagesService, PrismaService],
  exports: [AnimalImagesService],
  controllers: [AnimalImagesController],
})
export class AnimalImagesModule {}
