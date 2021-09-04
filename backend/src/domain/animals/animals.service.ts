import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import type { Animal, AnimalCategory, AnimalGender, AnimalLocation, AnimalType } from '.prisma/client';
import { VirtualCaretakerType, Permission } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { deleteImage, saveImage } from '../news/img-fs';
import { LogsService } from './../logs/logs.service';
import { LoggedInUser } from '../auth/types';
import { formattedDiff } from '../logs/diff';

export interface AnimalData {
  id: string
  name: string
  type: AnimalType
  gender: AnimalGender
  description: string
  category: AnimalCategory
  location: AnimalLocation | null
  locationDescription: string | null
  virtualCaretakerName: string | null
  virtualCaretakerType: VirtualCaretakerType
  isPublic: boolean
  imageData?: string
  imageName?: string
}

function validateAnimalCreate(animal: AnimalData): boolean {
  return validateAnimalUpdate(animal) && !!animal.imageData;
}

function validateAnimalUpdate(animal: AnimalData): boolean {
  return !!animal.name && !!animal.id;
}

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService, private logsService: LogsService) { }

  async getAll(takeTop?: number): Promise<Animal[]> {
    return await this.prisma.animal.findMany({ take: takeTop });
  }

  async get(id: string): Promise<Animal> {
    const animal = await this.prisma.animal.findUnique({ where: { id } });
    if (!animal) {
      throw new NotFoundException();
    }
    return animal;
  }

  async add(user: LoggedInUser, animal: AnimalData): Promise<Animal> {
    if (!validateAnimalCreate(animal)) {
      throw new BadRequestException(null, "Brak nazwy, id lub zdjęcia.");
    }
    if (!animal.virtualCaretakerName && animal.virtualCaretakerType === VirtualCaretakerType.Znalazl) {
      throw new BadRequestException(null, "Brak nazwy wirtualnego opiekuna.");
    }
    const existingAnimal = await this.prisma.animal.findUnique({ where: { id: animal.id } });
    if (!!existingAnimal) {
      throw new ConflictException(animal, "Zwierzę o podanym numerze już istnieje.");
    }

    const imageName = `${uuid()}.png`;
    await saveImage(imageName, animal.imageData, 'Animal Miniature');

    const { imageData, ...animalData } = animal;
    const createdAnimal = await this.prisma.animal.create({
      data: { ...animalData, imageName }
    });

    await this.logsService.log({
      message: `dodał zwierzę ${animalData.name}`,
      permission: Permission.ANIMAL,
      user,
    });
    return createdAnimal;
  }

  async update(user: LoggedInUser, id: string, animal: AnimalData): Promise<Animal> {
    if (!validateAnimalUpdate(animal)) {
      throw new BadRequestException(id, "Brak nazwy lub id.");
    }
    if (!animal.virtualCaretakerName && animal.virtualCaretakerType === VirtualCaretakerType.Znalazl) {
      throw new BadRequestException(id, "Brak nazwy wirtualnego opiekuna.");
    }
    const prevAnimal = await this.prisma.animal.findUnique({ where: { id } });
    if (!prevAnimal) {
      throw new NotFoundException();
    }

    if (prevAnimal.id !== animal.id) {
      throw new BadRequestException(id, "Identyfikator musi się zgadzać.");
    }

    if (animal.imageData) {
      await saveImage(animal.imageName, animal.imageData, 'Animal Miniature');
    }

    const { imageData, ...animalData } = animal;
    const updatedAnimal = await this.prisma.animal.update({
      where: { id }, data: animalData
    });

    const animalToDiff: Animal = {
      addedDate: null,
      imageName: null,
      note: null,
      ...animal,
    }
    const diff = formattedDiff(prevAnimal, animalToDiff, [
      { name: 'Imię', selector: (n: Animal) => n.name },
      { name: 'Opis', selector: (n: Animal) => n.description },
      { name: 'Notatka', selector: (n: Animal) => n.note },
      { name: 'Kategoria', selector: (n: Animal) => n.category },
      { name: 'Płeć', selector: (n: Animal) => n.gender },
      { name: 'Upublicznienie', selector: (n: Animal) => n.isPublic },
      { name: 'Miejsce przebywania', selector: (n: Animal) => n.location },
      { name: 'Rodzaj', selector: (n: Animal) => n.type },
      { name: 'Opiekun wirtualny', selector: (n: Animal) => n.virtualCaretakerType },
      { name: 'Nazwa opiekuna wirtualnego', selector: (n: Animal) => n.virtualCaretakerName },
      { name: 'Opis miejsca przebywania', selector: (n: Animal) => n.locationDescription },
    ], animal.imageData ? [{ name: 'Miniaturka' }] : []);

    await this.logsService.log({
      message: `zaktualizował zwierzę ${prevAnimal.name} (id ${prevAnimal.id}) ${diff}`,
      permission: Permission.ANIMAL,
      user,
    })
    return updatedAnimal;
  }

  async delete(user: LoggedInUser, id: string): Promise<Animal> {
    const animal = await this.prisma.animal.findUnique({ where: { id } });
    if (!animal) {
      throw new NotFoundException();
    }
    await this.prisma.animalImage.deleteMany({ where: { animalId: id } });
    await deleteImage(animal.imageName);

    const deletedAnimal = await this.prisma.animal.delete({
      where: { id }
    });
    await this.logsService.log({
      message: `usunał zwierzę ${animal.name}`,
      permission: Permission.ANIMAL,
      user,
    })
    return deletedAnimal;
  }
}
