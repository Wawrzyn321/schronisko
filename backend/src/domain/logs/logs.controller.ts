import { LogsService } from './logs.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Param, Query } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

@Controller('api/logs')
export class LogsController {
    constructor(private logsService: LogsService) { }

    @RequirePermission(Permission.USER)
    @Get()
    @UseGuards(PermissionsGuard)
    gegLogs(@Query() query) {
        const takeTop = parseInt(query.takeTop) || undefined;
        return this.logsService.get(takeTop);
    }
}
