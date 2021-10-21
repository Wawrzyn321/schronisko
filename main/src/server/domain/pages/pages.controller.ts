import { Public } from './../auth/public.decorator';
import { LoggedInUser } from './../auth/types';
import { Page } from './Page';
import { PagesService } from './pages.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Param, Patch, Body, Request } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';
import { Query } from '@nestjs/common';
import { ImageData } from '../../img-fs';

@Controller('api/pages')
export class PagesController {
    constructor(private pagesService: PagesService) { }

    @Public()
    @Get()
    getPages(@Query('takeTop') takeTopStr: string) {
        const takeTop = parseInt(takeTopStr) || undefined;
        return this.pagesService.getAll(takeTop);
    }

    @Public()
    @Get(':id')
    getPage(@Param("id") pageId: string) {
        return this.pagesService.get(pageId);
    }

    @RequirePermission(Permission.PAGE)
    @Patch(':id')
    @UseGuards(PermissionsGuard)
    updatePage(@Param("id") pageId: string, @Body() body: { page: Page, images: ImageData[] }, @Request() req: { user: LoggedInUser }) {
        return this.pagesService.update(req.user, pageId, body.page, body.images);
    }
}
