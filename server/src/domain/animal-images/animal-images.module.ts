import { Module } from '@nestjs/common';
import { AnimalImagesService } from './animal-images.service';
import {
  AnimalImagesController,
  AnimalImagesPublicController,
} from './animal-images.controller';
import { FsModule } from '../fs/fs.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [FsModule, PrismaModule],
  providers: [AnimalImagesService],
  exports: [AnimalImagesService],
  controllers: [AnimalImagesController, AnimalImagesPublicController],
})
export class AnimalImagesModule {}
