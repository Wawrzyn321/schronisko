import { NewsService } from './news.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Patch, Param, Body, Delete, Post } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

@Controller('api/news')
export class NewsController {
    constructor(private newsService: NewsService) {}

    @RequirePermission(Permission.NEWS)
    @Get()
    @UseGuards(PermissionsGuard)
    getNews() {
        return this.newsService.getAll();
    }

    @RequirePermission(Permission.NEWS)
    @Get(':id')
    @UseGuards(PermissionsGuard)
    getSingleNews(@Param("id") newsId: string) {
        return this.newsService.get(newsId);
    }

    @RequirePermission(Permission.NEWS)
    @Post()
    @UseGuards(PermissionsGuard)
    createNews(@Body() body) {
        return this.newsService.create(body);
    }

    @RequirePermission(Permission.NEWS)
    @Patch(':id')
    @UseGuards(PermissionsGuard)
    updateNews(@Param("id") newsId: string, @Body() body) {
        return this.newsService.update(newsId, body);
    }

    @RequirePermission(Permission.NEWS)
    @Delete(':id')
    @UseGuards(PermissionsGuard)
    deleteNews(@Param("id") newsId: string) {
        return this.newsService.delete(newsId);
    }
}
