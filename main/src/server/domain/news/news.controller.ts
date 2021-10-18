import { Public } from './../auth/public.decorator';
import { LoggedInUser } from './../auth/types';
import { NewsModifyParams, NewsCreateInput, NewsUpdateInput } from './News';
import { NewsService } from './news.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Patch, Param, Body, Delete, Post, BadRequestException, Request, Query } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

@Public() @Controller('api/c/news')
export class NewsPublicController {
    constructor(private newsService: NewsService) { }

    @Get()
    getNews(@Query() query) {
        const takeTop = parseInt(query.takeTop) || undefined;
        return this.newsService.getAll(takeTop, true);
    }

    @Get('recent')
    getRecentNews(@Query() query) {
        const count = parseInt(query.count) || 5;
        return this.newsService.getRecent(count);
    }

    @Get(':id')
    getSingleNews(@Param("id") newsId: string) {
        return this.newsService.get(newsId, true);
    }
}

@Controller('api/news')
export class NewsController {
    constructor(private newsService: NewsService) { }

    @RequirePermission(Permission.NEWS)
    @Get()
    getNews(@Query() query) {
        const takeTop = parseInt(query.takeTop) || undefined;
        return this.newsService.getAll(takeTop);
    }

    @RequirePermission(Permission.NEWS)
    @Get(':id')
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
