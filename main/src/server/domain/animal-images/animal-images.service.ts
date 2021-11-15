import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { deleteImage, saveImage } from '../../img-fs';
import { AnimalImageParams } from './animal-images.controller';
import { v4 as uuid } from 'uuid';
import { AnimalImage } from '@prisma/client';

const IMAGES_PATH = 'animals/pics/';

export interface UpsertParams extends AnimalImageParams, AnimalImage { }

@Injectable()
export class AnimalImagesService {
  constructor(private prisma: PrismaService) { }

  async get(animalId: string, filterPublic?: boolean): Promise<AnimalImage[]> {
    // better findUnique instead of findFirst
    if (!this.prisma.animal.findFirst({ where: { id: animalId, isPublic: filterPublic ? true : undefined } })) {
      throw new NotFoundException();
    }

    return await this.prisma.animalImage.findMany({ where: { animalId, visible: filterPublic ? true : undefined } });
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
        await saveImage(IMAGES_PATH, imageName, image.data, 'Animal Gallery');
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
        await this.deleteImage(IMAGES_PATH, image.id);
      }
    }

    return images;
  }

  async deleteByAnimal(animalId: string): Promise<void> {
    const images = await this.get(animalId);
    for (const image of images) {
      try {
        await deleteImage(IMAGES_PATH, image.imageName);
      } catch (e: unknown) {
        console.warn(e);
      }
    }
    await this.prisma.animalImage.deleteMany({ where: { animalId } })
  }

  async deleteImage(subdir: string, id: string): Promise<void> {
    const image = await this.prisma.animalImage.findFirst({ where: { id } })
    try {
      await deleteImage(IMAGES_PATH, image.imageName);
    } catch (e: unknown) {
      console.warn(e);
    }
    await this.prisma.animalImage.delete({ where: { id } })
  }
}
