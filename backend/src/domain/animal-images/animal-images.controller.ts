import { AnimalImagesService } from './animal-images.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Param, Patch, Body, Post, Delete, Put } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

export interface AnimalImageParams {
    data: string;
    order: number;
    visible: boolean;
}

@Controller('api/animal-images')
export class AnimalImagesController {
    constructor(private animalImagesService: AnimalImagesService) { }

    @RequirePermission(Permission.ANIMAL)
    @Get(':id')
    @UseGuards(PermissionsGuard)
    getImages(@Param("id") animalId: string) {
        return this.animalImagesService.get(animalId);
    }

    @RequirePermission(Permission.ANIMAL)
    @Put(':id')
    @UseGuards(PermissionsGuard)
    upsertImages(@Param("id") animalId: string, @Body() images: AnimalImageParams[]) {
        return this.animalImagesService.upsert(animalId, images);
    }

    @RequirePermission(Permission.ANIMAL)
    @Delete(':id')
    @UseGuards(PermissionsGuard)
    deleteImages(@Param("id") animalId: string) {
        return this.animalImagesService.delete(animalId);
    }
}
