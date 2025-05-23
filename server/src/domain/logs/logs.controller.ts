import { LoggedInUser } from '../auth/types';
import { LogsService } from './logs.service';
import { RequirePermission } from '../auth/decorators/Permissions.decorator';
import {
  Controller,
  Get,
  UseGuards,
  Query,
  Delete,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { Permission } from '@prisma-app/client';
import { PermissionsGuard } from '../auth/guards/Permissions.guard';

@Controller('api/logs')
export class LogsController {
  constructor(private logsService: LogsService) {}

  @RequirePermission(Permission.USER)
  @Get()
  @UseGuards(PermissionsGuard)
  getLogs(
    @Query('takeTop', new ParseIntPipe({ optional: true })) takeTop?: number,
  ) {
    return this.logsService.get(takeTop);
  }

  @RequirePermission(Permission.USER)
  @Delete()
  @UseGuards(PermissionsGuard)
  deleteLogs(@Request() req: { user: LoggedInUser }) {
    return this.logsService.delete(req.user);
  }
}
