import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import type {
  Animal,
  AnimalGender,
  AnimalLocation,
  AnimalType,
} from '@prisma-app/client';
import { AnimalCategory } from '@prisma-app/client';
import { VirtualCaretakerType, Permission } from '@prisma-app/client';
import { deleteImage, saveImage } from '../../util/img-fs';
import { LogsService } from '../logs/logs.service';
import { LoggedInUser } from '../auth/types';
import { formattedDiff } from '../logs/diff';
import * as gen from 'random-seed';
import { AnimalImagesService } from '../animal-images/animal-images.service';
import { changedToReadonly } from './readonly-animal';
import { randomUUID } from 'crypto';

const IMAGES_PATH = 'animals/';

export type AnimalData = {
  id: string;
  refNo: string;
  name: string;
  type: AnimalType;
  gender: AnimalGender;
  description: string;
  category: AnimalCategory;
  location: AnimalLocation | null;
  locationDescription: string | null;
  virtualCaretakerName: string | null;
  virtualCaretakerType: VirtualCaretakerType;
  isPublic: boolean;
  imageData?: string;
  imageName?: string;
  contactInfo: string;
};

function validateAnimalCreateOrUpdate(animal: AnimalData): boolean {
  return !!animal.name && !!animal.refNo;
}

type AfterAdoptionAnimal = Pick<Animal, 'id' | 'imageName' | 'name' | 'type'>;
type AnimalListElement = Omit<Animal, 'description'>;

function createDailyRandomGen() {
  const d = new Date();
  return gen.create((d.getDay() * d.getMonth()).toString());
}

function getDailyRandom<T>(items: T[], count: number): T[] {
  if (count >= items.length) {
    return items;
  }

  const rand = createDailyRandomGen();

  const indices: number[] = [];
  for (let i = 0; i < count; i++) {
    let index: number;
    do {
      index = rand.range(items.length);
    } while (indices.includes(index));
    indices.push(index);
  }
  return indices.map((i) => items[i]);
}

@Injectable()
export class AnimalsService {
  constructor(
    private prisma: PrismaService,
    private logsService: LogsService,
    private animalImagesService: AnimalImagesService,
  ) {}

  async getAllPublic(
    take?: number,
    skip?: number,
    virtualCaretakerType?: VirtualCaretakerType,
    categories?: AnimalCategory[],
    type?: AnimalType,
  ) {
    const animals = await this.getAll(
      take,
      skip,
      virtualCaretakerType,
      categories,
      type,
      true,
    );
    const totalCount = await this.prisma.animal.count({
      where: {
        category: categories?.length ? { in: categories } : undefined,
        type,
        virtualCaretakerType,
        isPublic: true,
      },
    });
    return {
      animals,
      totalCount,
    };
  }

  async getAll(
    take?: number,
    skip?: number,
    virtualCaretakerType?: VirtualCaretakerType,
    categories?: AnimalCategory[],
    type?: AnimalType,
    onlyPublic?: boolean,
  ): Promise<AnimalListElement[]> {
    const animals = await this.prisma.animal.findMany({
      take,
      skip,
      where: {
        category: categories?.length ? { in: categories } : undefined,
        type,
        virtualCaretakerType,
        isPublic: onlyPublic ? true : undefined,
      },
    });
    return animals.map((animal: Animal) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { description, ...animalListElement } = animal;
      return animalListElement;
    });
  }

  async getAfterAdoption(count: number): Promise<AfterAdoptionAnimal[]> {
    const fields = { id: true, imageName: true, name: true, type: true };
    const results = await this.prisma.animal.findMany({
      where: { category: AnimalCategory.ZnalazlyDom, isPublic: true },
      select: fields,
    });
    return getDailyRandom(results, count);
  }

  async get(id: string, onlyPublic?: boolean): Promise<Animal> {
    const animal = await this.prisma.animal.findFirst({
      where: { id, isPublic: onlyPublic ? true : undefined },
    });
    if (!animal) {
      throw new NotFoundException();
    }
    return animal;
  }

  async add(animal: AnimalData, user: LoggedInUser): Promise<Animal> {
    if (!validateAnimalCreateOrUpdate(animal)) {
      throw new BadRequestException('Brak nazwy lub numeru referencyjnego.');
    }
    if (
      !animal.virtualCaretakerName &&
      animal.virtualCaretakerType === VirtualCaretakerType.Znalazl
    ) {
      throw new BadRequestException('Brak nazwy wirtualnego opiekuna.');
    }
    const existingAnimal = await this.prisma.animal.findUnique({
      where: { id: animal.id },
    });
    if (!!existingAnimal) {
      throw new ConflictException('Conflict Exception');
    }

    const id = randomUUID();

    let imageName = null;
    if (animal.imageData) {
      imageName = `${id}.png`;
      await saveImage({
        subdir: IMAGES_PATH,
        base64Data: animal.imageData,
        name: imageName,
        resizingPreset: 'Animal Miniature',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageData, ...animalData } = animal;
    const createdAnimal = await this.prisma.animal.create({
      data: { ...animalData, imageName, id },
    });

    await this.logsService.log({
      message: `dodał zwierzę ${animalData.name}`,
      permission: Permission.ANIMAL,
      user,
    });
    return createdAnimal;
  }

  async update(
    id: string,
    animal: AnimalData,
    user: LoggedInUser,
  ): Promise<Animal> {
    if (!validateAnimalCreateOrUpdate(animal)) {
      throw new BadRequestException('Brak nazwy lub numeru referencyjnego.');
    }
    if (
      !animal.virtualCaretakerName &&
      animal.virtualCaretakerType === VirtualCaretakerType.Znalazl
    ) {
      throw new BadRequestException('Brak nazwy wirtualnego opiekuna.');
    }
    const prevAnimal = await this.prisma.animal.findUnique({ where: { id } });
    if (!prevAnimal) {
      throw new NotFoundException();
    }

    if (prevAnimal.id !== animal.id) {
      throw new BadRequestException('Identyfikator musi się zgadzać.');
    }

    if (animal.imageData) {
      if (!animal.imageName) {
        animal.imageName = `${randomUUID()}.png`;
      }
      await saveImage({
        subdir: IMAGES_PATH,
        name: animal.imageName,
        base64Data: animal.imageData,
        resizingPreset: 'Animal Miniature',
      });
    } else {
      // previous image exist, next doesn't
      if (!animal.imageName && prevAnimal.imageName) {
        try {
          await deleteImage(IMAGES_PATH, prevAnimal.imageName);
        } catch (e) {
          console.warn(e);
        }
      }
    }

    if (changedToReadonly(animal.category, prevAnimal.category)) {
      await this.animalImagesService.deleteByAnimal(animal.id);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageData, ...animalData } = animal;

    const updatedAnimal = await this.prisma.animal.update({
      where: { id },
      data: { ...animalData, modifiedAt: new Date() },
    });

    // date won't be diffed
    const mockDate = new Date();
    const animalToDiff: Animal = {
      addedAt: mockDate,
      modifiedAt: mockDate,
      imageName: null,
      note: null,
      ...animal,
    };
    const diff = formattedDiff(
      prevAnimal,
      animalToDiff,
      [
        { name: 'Imię', selector: (n) => n.name },
        { name: 'Numer referencyjny', selector: (n) => n.refNo },
        { name: 'Opis', selector: (n) => n.description },
        { name: 'Notatka', selector: (n) => n.note },
        { name: 'Kategoria', selector: (n) => n.category },
        { name: 'Płeć', selector: (n) => n.gender },
        { name: 'Upublicznienie', selector: (n) => n.isPublic },
        { name: 'Miejsce przebywania', selector: (n) => n.location },
        { name: 'Rodzaj', selector: (n) => n.type },
        {
          name: 'Opiekun wirtualny',
          selector: (n) => n.virtualCaretakerType,
        },
        {
          name: 'Nazwa opiekuna wirtualnego',
          selector: (n) => n.virtualCaretakerName,
        },
        {
          name: 'Opis miejsca przebywania',
          selector: (n) => n.locationDescription,
        },
        { name: 'Dane kontakowe', selector: (n) => n.contactInfo },
      ],
      animal.imageData ? [{ name: 'Miniaturka' }] : [],
    );

    await this.logsService.log({
      message: `zaktualizował zwierzę ${prevAnimal.name} (id ${prevAnimal.id}, nr ${prevAnimal.refNo}) ${diff}`,
      permission: Permission.ANIMAL,
      user,
    });
    return updatedAnimal;
  }

  async delete(id: string, user: LoggedInUser): Promise<Animal> {
    const animal = await this.get(id, false);

    await this.animalImagesService.deleteByAnimal(id);
    let imageDeleteFailed = false;
    if (animal.imageName) {
      try {
        await deleteImage(IMAGES_PATH, animal.imageName);
      } catch (e: unknown) {
        console.warn(e);
        imageDeleteFailed = true;
      }
    }

    const deletedAnimal = await this.prisma.animal.delete({
      where: { id },
    });
    if (imageDeleteFailed) {
      await this.logsService.log({
        message: `usunał zwierzę ${animal.name}, ale nie udało się usunąć jego zdjęcia.`,
        permission: Permission.ANIMAL,
        user,
      });
    } else {
      await this.logsService.log({
        message: `usunał zwierzę ${animal.name}`,
        permission: Permission.ANIMAL,
        user,
      });
    }
    return deletedAnimal;
  }
}
