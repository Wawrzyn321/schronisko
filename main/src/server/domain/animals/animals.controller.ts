import { AnimalCategory, AnimalGender } from '.prisma/client';
import { Public } from './../auth/public.decorator';
import { LoggedInUser } from './../auth/types';
import { AnimalsService, AnimalData } from './animals.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Param, Patch, Body, Post, Delete, Request, Query } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

@Controller('api/animals')
export class AnimalsController {
    constructor(private animalsService: AnimalsService) { }

    @Public()
    @Get()
    getAnimals(@Query() query) {
        const takeTop = parseInt(query.takeTop) || undefined;
        const category: AnimalCategory | undefined =
            Object.keys(AnimalCategory).includes(query.category) ? query.category : undefined;
        const gender: AnimalGender | undefined =
            Object.keys(AnimalGender).includes(query.gender) ? query.gender : undefined;

        return this.animalsService.getAll(takeTop, category, gender);
    }

    @Public()
    @Get('after-adoption')
    getAfterAdoptionAnimals(@Query() query) {
        const count = parseInt(query.count) || 3;
        return this.animalsService.getAfterAdoption(count);
    }

    @Public()
    @Get(':id')
    getAnimal(@Param("id") animalId: string) {
        return this.animalsService.get(animalId);
    }

    @RequirePermission(Permission.ANIMAL)
    @Post()
    @UseGuards(PermissionsGuard)
    addAnimal(@Body() body: AnimalData, @Request() req: { user: LoggedInUser }) {
        return this.animalsService.add(req.user, body);
    }

    @RequirePermission(Permission.ANIMAL)
    @Patch(':id')
    @UseGuards(PermissionsGuard)
    updateAnimal(@Param("id") animalId: string, @Body() body: AnimalData, @Request() req: { user: LoggedInUser }) {
        return this.animalsService.update(req.user, decodeURIComponent(animalId), body);
    }

    @RequirePermission(Permission.ANIMAL)
    @Delete(':id')
    @UseGuards(PermissionsGuard)
    deleteAnimal(@Param("id") animalId: string, @Request() req: { user: LoggedInUser }) {
        return this.animalsService.delete(req.user, decodeURIComponent(animalId));
    }
}
