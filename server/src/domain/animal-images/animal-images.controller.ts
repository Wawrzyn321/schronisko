import { Public } from '../auth/decorators/public.decorator';
import { AnimalImagesService, UpsertParams } from './animal-images.service';
import { RequirePermission } from '../auth/decorators/Permissions.decorator';
import {
  Controller,
  Get,
  UseGuards,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/guards/Permissions.guard';

export type AnimalImageParams = {
  data: string;
  order: number;
  visible: boolean;
};

@Public()
@Controller('api/c/animal-images')
export class AnimalImagesPublicController {
  constructor(private animalImagesService: AnimalImagesService) {}

  @Get(':id')
  getImages(@Param('id') animalId: string) {
    return this.animalImagesService.get(animalId, true);
  }
}

@Controller('api/animal-images')
export class AnimalImagesController {
  constructor(private animalImagesService: AnimalImagesService) {}

  @RequirePermission(Permission.ANIMAL_VIEW_ONLY)
  @Get(':id')
  getImages(@Param('id') animalId: string) {
    return this.animalImagesService.get(animalId);
  }

  @RequirePermission(Permission.ANIMAL)
  @Put(':id')
  @UseGuards(PermissionsGuard)
  upsertImages(@Param('id') animalId: string, @Body() images: UpsertParams[]) {
    return this.animalImagesService.upsert(
      decodeURIComponent(animalId),
      images,
    );
  }

  @RequirePermission(Permission.ANIMAL)
  @Delete(':id')
  @UseGuards(PermissionsGuard)
  deleteImages(@Param('id') animalId: string) {
    return this.animalImagesService.deleteByAnimal(
      decodeURIComponent(animalId),
    );
  }
}
