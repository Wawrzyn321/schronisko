import { AnimalCategory, AnimalType } from '.prisma/client';
import { Public } from './../auth/public.decorator';
import { LoggedInUser } from './../auth/types';
import { AnimalsService, AnimalData } from './animals.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Param, Patch, Body, Post, Delete, Request, Query, UseInterceptors } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

@Public()
@Controller('api/c/animals')
export class AnimalsPublicController {
    constructor(private animalsService: AnimalsService) { }

    @Get('after-adoption')
    getAfterAdoptionAnimals(@Query('count') countStr: string) {
        const count = parseInt(countStr) || 3;
        return this.animalsService.getAfterAdoption(count);
    }

    @Get()
    getAnimalsPublic(@Query('category') possibleCategory: string, @Query('type') possibleType: string, @Query('skip') possiblySkip, @Query('take') possiblyTake: string) {
        const skip = parseInt(possiblySkip) || 0;
        const take = parseInt(possiblyTake) || 27;

        const category: AnimalCategory | undefined =
            Object.keys(AnimalCategory).includes(possibleCategory) ? possibleCategory as AnimalCategory : undefined;
        const type: AnimalType | undefined =
            Object.keys(AnimalType).includes(possibleType) ? possibleType as AnimalType : undefined;

        return this.animalsService.getAllPublic(take, skip, category, type);
    }

    @Get(':id')
    getAnimal(@Param("id") animalId: string) {
        return this.animalsService.get(animalId, true);
    }
}


@Controller('api/animals')
export class AnimalsController {
    constructor(private animalsService: AnimalsService) { }

    @RequirePermission(Permission.ANIMAL)
    @Get()
    getAnimals(@Query('take') takeStr: string, @Query('skip') skipStr: string) {
        const take = parseInt(takeStr) || undefined;
        const skip = parseInt(skipStr) || undefined;
        return this.animalsService.getAll(take, skip);
    }

    @RequirePermission(Permission.ANIMAL)
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
