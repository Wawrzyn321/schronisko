import { Animal } from '.prisma/client';
import { AnimalsService, AnimalData } from './animals.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Param, Patch, Body, Post, Delete } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

interface AnimalHttpParams extends Animal {
    imageData: string;
}

@Controller('api/animals')
export class AnimalsController {
    constructor(private animalsService: AnimalsService) { }

    @RequirePermission(Permission.ANIMAL)
    @Get()
    @UseGuards(PermissionsGuard)
    getAnimals() {
        return this.animalsService.getAll();
    }

    @RequirePermission(Permission.ANIMAL)
    @Get(':id')
    @UseGuards(PermissionsGuard)
    getAnimal(@Param("id") animalId: string) {
        return this.animalsService.get(animalId);
    }

    @RequirePermission(Permission.ANIMAL)
    @Post()
    @UseGuards(PermissionsGuard)
    addAnimal(@Body() body: AnimalData) {
        return this.animalsService.add(body);
    }

    @RequirePermission(Permission.ANIMAL)
    @Patch(':id')
    @UseGuards(PermissionsGuard)
    updateAnimal(@Param("id") animalId: string, @Body() body: AnimalData) {
        return this.animalsService.update(animalId, body);
    }

    @RequirePermission(Permission.ANIMAL)
    @Delete(':id')
    @UseGuards(PermissionsGuard)
    deleteAnimal(@Param("id") animalId: string) {
        return this.animalsService.delete(animalId);
    }
}
