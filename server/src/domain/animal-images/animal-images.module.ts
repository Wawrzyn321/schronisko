import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { AnimalImagesService } from './animal-images.service';
import {
  AnimalImagesController,
  AnimalImagesPublicController,
} from './animal-images.controller';
import { FsServiceInterface } from '../fs/interface';
import { FsService } from '../fs/fs.service';

@Module({
  providers: [
    AnimalImagesService,
    PrismaService,
    {
      provide: FsServiceInterface,
      useClass: FsService,
    },
  ],
  exports: [],
  controllers: [AnimalImagesController, AnimalImagesPublicController],
})
export class AnimalImagesModule {}
