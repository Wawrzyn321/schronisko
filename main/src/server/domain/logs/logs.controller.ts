import { LoggedInUser } from './../auth/types';
import { LogsService } from './logs.service';
import { RequirePermission } from '../auth/Permissions.decorator';
import { Controller, Get, UseGuards, Query, Delete, Request } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/Permissions.guard';

@Controller('api/logs')
export class LogsController {
    constructor(private logsService: LogsService) { }

    @RequirePermission(Permission.USER)
    @Get()
    @UseGuards(PermissionsGuard)
    getLogs(@Query() query) {
        const takeTop = parseInt(query.takeTop) || undefined;
        return this.logsService.get(takeTop);
    }

    @RequirePermission(Permission.USER)
    @Delete()
    @UseGuards(PermissionsGuard)
    deleteLogs(@Request() req: { user: LoggedInUser }) {
        return this.logsService.delete(req.user);
    }
}