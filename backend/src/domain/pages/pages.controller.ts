import { LoggedInUser } from './../auth/types';
import { Page } from './Page';
import { PagesService } from './pages.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Param, Patch, Body, Request } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';
import { Query } from '@nestjs/common';

@Controller('api/pages')
export class PagesController {
    constructor(private pagesService: PagesService) {}

    @RequirePermission(Permission.PAGE)
    @Get()
    @UseGuards(PermissionsGuard)
    getPages(@Query() query) {
        const takeTop = parseInt(query.takeTop) || undefined;
        return this.pagesService.getAll(takeTop);
    }

    @RequirePermission(Permission.PAGE)
    @Get(':id')
    @UseGuards(PermissionsGuard)
    getPage(@Param("id") pageId: string) {
        return this.pagesService.get(pageId);
    }

    @RequirePermission(Permission.PAGE)
    @Patch(':id')
    @UseGuards(PermissionsGuard)
    updatePage(@Param("id") pageId: string, @Body() body: Page, @Request() req: { user: LoggedInUser }) {
        return this.pagesService.update(req.user, pageId, body);
    }
}
