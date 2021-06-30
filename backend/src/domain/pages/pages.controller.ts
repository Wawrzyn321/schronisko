import { Page } from './Page';
import { PagesService } from './pages.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

@Controller('api/pages')
export class PagesController {
    constructor(private pagesService: PagesService) {}

    @RequirePermission(Permission.PAGE)
    @Get()
    @UseGuards(PermissionsGuard)
    getPages() {
        return this.pagesService.getAll();
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
    updatePage(@Param("id") pageId: string, @Body() body: Page) {
        return this.pagesService.update(pageId, body);
    }
}
