import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { AnimalImagesService } from './animal-images.service';
import {
  AnimalImagesController,
  AnimalImagesPublicController,
} from './animal-images.controller';
import { FsModule } from '../fs/fs.module';

@Module({
  imports: [FsModule],
  providers: [AnimalImagesService, PrismaService],
  exports: [AnimalImagesService],
  controllers: [AnimalImagesController, AnimalImagesPublicController],
})
export class AnimalImagesModule {}
