import { LoggedInUser } from './../auth/types';
import { NewsModifyParams, NewsCreateInput, NewsUpdateInput } from './News';
import { NewsService } from './news.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Patch, Param, Body, Delete, Post, BadRequestException, Request, Query } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

@Controller('api/news')
export class NewsController {
    constructor(private newsService: NewsService) {}

    @RequirePermission(Permission.NEWS)
    @Get()
    @UseGuards(PermissionsGuard)
    getNews(@Query() query) {
        const takeTop = parseInt(query.takeTop) || undefined;
        return this.newsService.getAll(takeTop);
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
    createNews(@Body() body: NewsModifyParams<NewsCreateInput>, @Request() req: { user: LoggedInUser }) {
        return this.newsService.create(req.user, body);
    }

    @RequirePermission(Permission.NEWS)
    @Patch(':id')
    @UseGuards(PermissionsGuard)
    updateNews(@Param("id") newsId: string, @Body() body: NewsModifyParams<NewsUpdateInput>, @Request() req: { user: LoggedInUser }) {
        if (newsId !== body?.news?.id) {
            throw new BadRequestException();
        }
        return this.newsService.update(req.user, newsId, body);
    }

    @RequirePermission(Permission.NEWS)
    @Delete(':id')
    @UseGuards(PermissionsGuard)
    deleteNews(@Param("id") newsId: string, @Request() req: { user: LoggedInUser }) {
        return this.newsService.delete(req.user, newsId);
    }
}
