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
  ParseIntPipe,
  ParseArrayPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { Permission } from '@prisma-app/client';
import { PermissionsGuard } from '../auth/guards/Permissions.guard';
import { AnimalCategoryArrayPipe } from './AnimalCategoryArrayPipe';

@Public()
@Controller('api/c/animals')
export class AnimalsPublicController {
  constructor(private animalsService: AnimalsService) {}

  @Get('after-adoption')
  getAfterAdoptionAnimals(
    @Query('count', new ParseIntPipe({ optional: true })) count?: number,
  ) {
    return this.animalsService.getAfterAdoption(count ?? 3);
  }

  @Get()
  getAnimalsPublic(
    @Query('categories', AnimalCategoryArrayPipe) categories: AnimalCategory[],
    @Query('type', new ParseEnumPipe(AnimalType, { optional: true }))
    type?: AnimalType,
    @Query(
      'vCaretakerType',
      new ParseEnumPipe(VirtualCaretakerType, { optional: true }),
    )
    virtualCaretakerType?: VirtualCaretakerType,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.animalsService.getAllPublic({
      take,
      skip,
      virtualCaretakerType,
      categories,
      type,
    });
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
  getAnimals(
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
  ) {
    return this.animalsService.getAll({ take, skip });
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
