import { Public } from './../auth/decorators/public.decorator';
import { LoggedInUser } from '../auth/types';
import { SettingsService } from './settings.service';
import { RequirePermission } from '../auth/decorators/Permissions.decorator';
import {
  Controller,
  Get,
  UseGuards,
  Param,
  Request,
  Put,
} from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionsGuard } from '../auth/guards/Permissions.guard';

@Controller('api/settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Public()
  @Get()
  getSettings() {
    return this.settingsService.getAll();
  }

  @RequirePermission(Permission.USER)
  @Put(':id/:value')
  @UseGuards(PermissionsGuard)
  upsertSetting(
    @Param('id') settingId: string,
    @Param('value') value: string,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.settingsService.upsert(req.user, settingId, value);
  }
}
