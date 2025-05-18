import {
  AnimalCategory,
  AnimalType,
  VirtualCaretakerType,
} from '@prisma-app/client';
import { Public } from '../auth/decorators/public.decorator';
import { LoggedInUser } from '../auth/types';
import { AnimalsService, AnimalData } from './animals.service';
import { RequirePermission } from '../auth/decorators/Permissions.decorator';
import {
  Controller,
  Get,
  UseGuards,
  Param,
  Patch,
  Body,
  Post,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { Permission } from '@prisma-app/client';
import { PermissionsGuard } from '../auth/guards/Permissions.guard';

@Public()
@Controller('api/c/animals')
export class AnimalsPublicController {
  constructor(private animalsService: AnimalsService) {}

  @Get('after-adoption')
  getAfterAdoptionAnimals(@Query('count') countStr: string) {
    const count = parseInt(countStr) || 3;
    return this.animalsService.getAfterAdoption(count);
  }

  @Get()
  getAnimalsPublic(
    @Query('categories') possibleCategories: string,
    @Query('type') possibleType: string,
    @Query('vCaretakerType') possibleVaretakerType: string,
    @Query('skip') possiblySkip: string,
    @Query('take') possiblyTake: string,
  ) {
    const skip = parseInt(possiblySkip) || 0;
    const take = parseInt(possiblyTake) || 27;

    function getFromEnumOrUndefined<T>(
      possibleT: string,
      keys: string[],
    ): T | undefined {
      if (keys.includes(possibleT)) {
        return possibleT as unknown as T;
      } else {
        return undefined;
      }
    }

    const categories: AnimalCategory[] = [];
    for (const possibleCategory of (possibleCategories || '').split(',')) {
      const category = getFromEnumOrUndefined<AnimalCategory>(
        possibleCategory,
        Object.keys(AnimalCategory),
      );
      if (category) {
        categories.push(category);
      }
    }

    const type = getFromEnumOrUndefined<AnimalType>(
      possibleType,
      Object.keys(AnimalType),
    );
    const virtualCaretakerType = getFromEnumOrUndefined<VirtualCaretakerType>(
      possibleVaretakerType,
      Object.keys(VirtualCaretakerType),
    );

    return this.animalsService.getAllPublic(
      take,
      skip,
      virtualCaretakerType,
      categories,
      type,
    );
  }

  @Get(':id')
  getAnimal(@Param('id') animalId: string) {
    return this.animalsService.get(animalId, true);
  }
}

@Controller('api/animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @RequirePermission(Permission.ANIMAL_VIEW_ONLY)
  @Get()
  getAnimals(@Query('take') takeStr: string, @Query('skip') skipStr: string) {
    const take = parseInt(takeStr) || undefined;
    const skip = parseInt(skipStr) || undefined;
    return this.animalsService.getAll(take, skip);
  }

  @RequirePermission(Permission.ANIMAL_VIEW_ONLY)
  @Get(':id')
  getAnimal(@Param('id') animalId: string) {
    return this.animalsService.get(animalId);
  }

  @RequirePermission(Permission.ANIMAL)
  @Post()
  @UseGuards(PermissionsGuard)
  addAnimal(@Body() body: AnimalData, @Request() req: { user: LoggedInUser }) {
    return this.animalsService.add(body, req.user);
  }

  @RequirePermission(Permission.ANIMAL)
  @Patch(':id')
  @UseGuards(PermissionsGuard)
  updateAnimal(
    @Param('id') animalId: string,
    @Body() body: AnimalData,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.animalsService.update(
      decodeURIComponent(animalId),
      body,
      req.user,
    );
  }

  @RequirePermission(Permission.ANIMAL)
  @Delete(':id')
  @UseGuards(PermissionsGuard)
  deleteAnimal(
    @Param('id') animalId: string,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.animalsService.delete(decodeURIComponent(animalId), req.user);
  }
}
