import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import type { Animal, AnimalCategory, AnimalGender, AnimalLocation, AnimalType } from '.prisma/client';
import { VirtualCaretakerType } from '@prisma/client';

export interface AnimalCreateParams {
  name: string
  type: AnimalType
  gender: AnimalGender
  description: string
  category: AnimalCategory
  location: AnimalLocation | null
  virtualCaretakerName: string | null
  virtualCaretakerType: VirtualCaretakerType
  isPublic: boolean
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

  async add(animal: AnimalCreateParams): Promise<Animal> {
    if (!animal.virtualCaretakerName && animal.virtualCaretakerType === VirtualCaretakerType.Znalazl) {
      throw new BadRequestException(animal, "Brak nazwy wirtualnego opiekuna.");
    }
    return await this.prisma.animal.create({
      data: animal
    });
  }

  async update(id: string, animal: Animal): Promise<Animal> {
    if (!animal.virtualCaretakerName && animal.virtualCaretakerType === VirtualCaretakerType.Znalazl) {
      throw new BadRequestException(id, "Brak nazwy wirtualnego opiekuna.");
    }
    return await this.prisma.animal.update({
      where: { id }, data: animal
    });
  }

  async delete(id: string): Promise<Animal> {
    return await this.prisma.animal.delete({
      where: { id }
    });
  }
}
