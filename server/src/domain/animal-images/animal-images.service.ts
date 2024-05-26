import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { deleteImage, saveImage } from '../../util/img-fs';
import { AnimalImageParams } from './animal-images.controller';
import { AnimalImage } from '@prisma-app/client';
import { randomUUID } from "crypto"

const IMAGES_PATH = 'animals/pics/';

export type UpsertParams = {
  id?: string;
  order: number;
  animalId: string;
  imageName?: string;
  data?: string;
  visible: boolean;
};

@Injectable()
export class AnimalImagesService {
  constructor(private prisma: PrismaService) {}

  async get(animalId: string, onlyPublic = false): Promise<AnimalImage[]> {
    if (
      !this.prisma.animal.findFirst({
        where: { id: animalId, isPublic: onlyPublic ? true : undefined },
      })
    ) {
      throw new NotFoundException();
    }

    return await this.prisma.animalImage.findMany({
      where: { animalId, visible: onlyPublic ? true : undefined },
    });
  }

  async upsert(
    animalId: string,
    images: UpsertParams[],
  ): Promise<AnimalImageParams[]> {
    if (images.length >= 8) {
      // po prostu 8 i tyle
      throw new BadRequestException(
        images.length,
        'Maksymalnie można wstawić 8 obrazów.',
      );
    }

    const imagesAlready = (await this.get(animalId)).map((image) => ({
      image,
      handled: false,
    }));

    for (const image of images) {
      if (image.imageName) {
        const img = imagesAlready.find(
          (i) => i.image.imageName == image.imageName,
        );
        if (!img) throw new BadRequestException('Image not found in post');
        img.handled = true;
      } else {
        const imageName = `${randomUUID()}.png`;
        await saveImage({
          subdir: IMAGES_PATH,
          name: imageName,
          base64Data: image.data,
          resizingPreset: 'Animal Gallery',
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, ...imageWithNoData } = image;

        await this.prisma.animalImage.create({
          data: {
            ...imageWithNoData,
            imageName,
            animalId,
          },
        });
      }
    }

    for (const { image, handled } of imagesAlready) {
      if (!handled) {
        try {
          await this.deleteImage(image.id);
        } catch (e) {
          console.warn("Error while deleting image of id', iamge.id");
          console.warn(e);
        }
      }
    }

    return images.map((i) => ({
      data: i.data,
      order: i.order,
      visible: i.visible,
    }));
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
    await this.prisma.animalImage.deleteMany({ where: { animalId } });
  }

  async deleteImage(id: string): Promise<void> {
    const image = await this.prisma.animalImage.findFirst({ where: { id } });
    try {
      await deleteImage(IMAGES_PATH, image.imageName);
    } catch (e: unknown) {
      console.warn(e);
    }
    await this.prisma.animalImage.delete({ where: { id } });
  }
}
