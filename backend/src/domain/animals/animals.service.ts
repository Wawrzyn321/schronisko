import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import type { Animal, AnimalCategory, AnimalGender, AnimalLocation, AnimalType } from '.prisma/client';
import { VirtualCaretakerType } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { saveImage } from '../news/img-fs';

export interface AnimalData {
  id: string
  name: string
  type: AnimalType
  gender: AnimalGender
  description: string
  category: AnimalCategory
  location: AnimalLocation | null
  virtualCaretakerName: string | null
  virtualCaretakerType: VirtualCaretakerType
  isPublic: boolean
  imageData?: string
  imageName?: string
}

function validateAnimalCreate(animal: AnimalData,): boolean {
  return validateAnimalUpdate(animal) && !!animal.imageData;
}

function validateAnimalUpdate(animal: AnimalData): boolean {
  return !!animal.name && !!animal.id;
}

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) { }

  async getAll(): Promise<Animal[]> {
    return await this.prisma.animal.findMany();
  }

  async get(id: string): Promise<Animal> {
    const animal = await this.prisma.animal.findUnique({ where: { id } });
    if (!animal) {
      throw new NotFoundException();
    }
    return animal;
  }

  async add(animal: AnimalData): Promise<Animal> {
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
    return await this.prisma.animal.create({
      data: { ...animalData, imageName }
    });
  }

  async update(id: string, animal: AnimalData): Promise<Animal> {
    if (!validateAnimalUpdate(animal)) {
      throw new BadRequestException(id, "Brak nazwy lub id.");
    }
    if (!animal.virtualCaretakerName && animal.virtualCaretakerType === VirtualCaretakerType.Znalazl) {
      throw new BadRequestException(id, "Brak nazwy wirtualnego opiekuna.");
    }
    if (!this.prisma.animal.findUnique({where: {id}})) {
      throw new NotFoundException();
    }

    if (animal.imageData) {
      await saveImage(animal.imageName, animal.imageData, 'Animal Miniature');
    }

    const { imageData, ...animalData } = animal;
    return await this.prisma.animal.update({
      where: { id }, data: animalData
    });
  }

  async delete(id: string): Promise<Animal> {
    if (!this.prisma.animal.findUnique({where: {id}})) {
      throw new NotFoundException();
    }
    return await this.prisma.animal.delete({
      where: { id }
    });
  }
}
