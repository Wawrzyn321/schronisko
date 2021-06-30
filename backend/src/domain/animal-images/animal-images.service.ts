import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import { deleteImage, saveImage } from '../news/img-fs';
import { AnimalImageParams } from './animal-images.controller';
import { v4 as uuid } from 'uuid';
import { AnimalImage } from '@prisma/client';

@Injectable()
export class AnimalImagesService {
  constructor(private prisma: PrismaService) { }

  async get(animalId: string): Promise<AnimalImage[]> {
    if (!this.prisma.animal.findUnique({ where: { id: animalId } })) {
      throw new NotFoundException();
    }

    return await this.prisma.animalImage.findMany({ where: { animalId } });
  }

  async upsert(animalId: string, images: AnimalImageParams[]): Promise<AnimalImageParams[]> {
    if (images.length >= 8) {
      // po prostu 8 i tyle
      throw new BadRequestException(images.length, "Maksymalnie można wstawić 8 obrazów.");
    }

    await this.delete(animalId);

    for (const image of images) {
      const imageName = `${uuid()}.png`;
      await saveImage(imageName, image.data, 'Animal Gallery');
      const { data, ...imageWithNoData } = image;
      console.log({
        ...imageWithNoData,
        imageName,
        animalId,
      })
      await this.prisma.animalImage.create({
        data: {
          ...imageWithNoData,
          imageName,
          animalId,
        }
      })
    }

    return images;
  }

  async delete(animalId: string): Promise<void> {
    const images = await this.get(animalId);
    for (const image of images) {
      try {
        await deleteImage(image.imageName);
      } catch (e) {
        console.warn(e);
      }
    }
    await this.prisma.animalImage.deleteMany({ where: { animalId } })
  }
}
