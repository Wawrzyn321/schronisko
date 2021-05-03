import { NewsService } from './news.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

@Controller('api/news')
export class NewsController {
    constructor(private newsService: NewsService) {}
}
