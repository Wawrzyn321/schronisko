import { Public } from '../auth/decorators/public.decorator';
import { LoggedInUser } from '../auth/types';
import { Page } from './Page';
import { PagesService } from './pages.service';
import { RequirePermission } from '../auth/decorators/Permissions.decorator';
import {
  Controller,
  Get,
  UseGuards,
  Param,
  Patch,
  Body,
  Request,
} from '@nestjs/common';
import { Permission } from '@prisma-app/client';
import { PermissionsGuard } from '../auth/guards/Permissions.guard';
import { Query } from '@nestjs/common';
import { ImageData } from '../../util/img-fs';

@Controller('api/pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @Public()
  @Get('/dog-volunteering')
  getDogVolunteeringPage() {
    return this.pagesService.getDogsPage();
  }

  // todo use https://docs.nestjs.com/controllers#sub-domain-routing ?
  @Public()
  @Get('/static-ids')
  getPageIdsForPrerender() {
    return this.pagesService.getIds();
  }

  @Public()
  @Get()
  getPages(@Query('takeTop') takeTopStr: string) {
    const takeTop = parseInt(takeTopStr) || undefined;
    return this.pagesService.getAll(takeTop);
  }

  @Public()
  @Get(':id')
  getPage(
    @Param('id') pageId: string,
    @Query('useSubstitution') useSubstitution: string = '',
  ) {
    return this.pagesService.get(pageId, {
      useSubstitution: useSubstitution !== 'false',
    });
  }

  @RequirePermission(Permission.PAGE)
  @Patch(':id')
  @UseGuards(PermissionsGuard)
  updatePage(
    @Param('id') pageId: string,
    @Body() body: { page: Page; images: ImageData[] },
    @Request() req: { user: LoggedInUser },
  ) {
    return this.pagesService.update(req.user, pageId, body.page, body.images);
  }
}
