import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { deleteImage, saveImage } from '../news/img-fs';
import { AnimalImageParams } from './animal-images.controller';
import { v4 as uuid } from 'uuid';
import { AnimalImage } from '@prisma/client';

export interface UpsertParams extends AnimalImageParams, AnimalImage {}

@Injectable()
export class AnimalImagesService {
  constructor(private prisma: PrismaService) { }

  async get(animalId: string): Promise<AnimalImage[]> {
    if (!this.prisma.animal.findUnique({ where: { id: animalId } })) {
      throw new NotFoundException();
    }

    return await this.prisma.animalImage.findMany({ where: { animalId } });
  }

  async upsert(animalId: string, images: UpsertParams[]): Promise<AnimalImageParams[]> {
    if (images.length >= 8) {
      // po prostu 8 i tyle
      throw new BadRequestException(images.length, "Maksymalnie można wstawić 8 obrazów.");
    }

    const imagesAlready = (await this.get(animalId)).map(image => ({ image, handled: false }))

    for (const image of images) {
      if (image.imageName) {
        const img = imagesAlready.find(i => i.image.imageName == image.imageName);
        if (!img) throw new BadRequestException("");
        img.handled = true;
      } else {
        const imageName = `${uuid()}.png`;
        await saveImage(imageName, image.data, 'Animal Gallery');
        const { data, ...imageWithNoData } = image;

        await this.prisma.animalImage.create({
          data: {
            ...imageWithNoData,
            imageName,
            animalId,
          }
        })
      }
    }

    for (const { image, handled } of imagesAlready) {
      if (!handled) {
        await this.deleteImage(image.id);
      }
    }

    return images;
  }

  async deleteByAnimal(animalId: string): Promise<void> {
    const images = await this.get(animalId);
    for (const image of images) {
      try {
        await deleteImage(image.imageName);
      } catch (e: unknown) {
        console.warn(e);
      }
    }
    await this.prisma.animalImage.deleteMany({ where: { animalId } })
  }

  async deleteImage(id: string): Promise<void> {
    const image = await this.prisma.animalImage.findFirst({ where: { id } })
    try {
      await deleteImage(image.imageName);
    } catch (e: unknown) {
      console.warn(e);
    }
    await this.prisma.animalImage.delete({ where: { id } })
  }
}
