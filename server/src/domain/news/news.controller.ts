import { Public } from '../auth/decorators/public.decorator';
import { LoggedInUser } from '../auth/types';
import { NewsModifyParams, NewsCreateInput, NewsUpdateInput } from './News';
import { NewsService } from './news.service';
import { RequirePermission } from '../auth/decorators/Permissions.decorator';
import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Param,
  Body,
  Delete,
  Post,
  BadRequestException,
  Request,
  Query,
} from '@nestjs/common';
import { Permission } from '@prisma-app/client';
import { PermissionsGuard } from '../auth/guards/Permissions.guard';

@Public()
@Controller('api/c/news')
export class NewsPublicController {
  constructor(private newsService: NewsService) {}

  @Get()
  getNews(@Query('takeTop') takeTopStr: string) {
    const takeTop = parseInt(takeTopStr) || undefined;
    return this.newsService.getAll(takeTop, true);
  }

  @Get('recent')
  getRecentNews(@Query('count') countStr: string) {
    const count = parseInt(countStr) || 5;
    return this.newsService.getRecent(count);
  }

  @Get(':id')
  getSingleNews(@Param('id') newsId: string) {
    return this.newsService.get(newsId, {
      onlyPublic: true,
      useSubstitution: true,
    });
  }
}

@Controller('api/news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @RequirePermission(Permission.NEWS)
  @Get()
  getNews(@Query('takeTop') takeTopStr: string) {
    const takeTop = parseInt(takeTopStr) || undefined;
    return this.newsService.getAll(takeTop);
  }

  @RequirePermission(Permission.NEWS)
  @Get(':id')
  getSingleNews(@Param('id') newsId: string) {
    return this.newsService.get(newsId, {
      onlyPublic: false,
      useSubstitution: false,
    });
  }

  @RequirePermission(Permission.NEWS)
  @Post()
  @UseGuards(PermissionsGuard)
  createNews(
    @Body() body: NewsModifyParams<NewsCreateInput>,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.newsService.create(req.user, body);
  }

  @RequirePermission(Permission.NEWS)
  @Patch(':id')
  @UseGuards(PermissionsGuard)
  updateNews(
    @Param('id') newsId: string,
    @Body() body: NewsModifyParams<NewsUpdateInput>,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.newsService.update(req.user, newsId, body);
  }

  @RequirePermission(Permission.NEWS)
  @Delete(':id')
  @UseGuards(PermissionsGuard)
  deleteNews(
    @Param('id') newsId: string,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.newsService.delete(req.user, newsId);
  }
}
