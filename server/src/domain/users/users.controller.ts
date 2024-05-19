import {
  FrontendUserCreateDto,
  FrontendSelfUpdateDto,
  FrontendUpdateOtherUserDto,
} from './types';
import { RequirePermission } from '../auth/decorators/Permissions.decorator';
import { PermissionsGuard } from '../auth/guards/Permissions.guard';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Body,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { Permission } from '@prisma-app/client';
import { LoggedInUser } from '../auth/types';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @RequirePermission(Permission.USER)
  @Get()
  @UseGuards(PermissionsGuard)
  getUsers() {
    return this.usersService.getAll();
  }

  @RequirePermission(Permission.USER)
  @Post()
  @UseGuards(PermissionsGuard)
  createUser(
    @Body() body: FrontendUserCreateDto,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.usersService.create(req.user, body);
  }

  @Patch()
  updateUser(
    @Body() body: FrontendSelfUpdateDto,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.usersService.updateSelf(body, req.user);
  }

  @Patch('update-other/:id')
  updateOtherUser(
    @Param('id') userId: string,
    @Body() body: FrontendUpdateOtherUserDto,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.usersService.updateOther(parseInt(userId), body, req.user);
  }

  @RequirePermission(Permission.USER)
  @Delete(':id')
  @UseGuards(PermissionsGuard)
  deleteUser(
    @Param('id') userId: string,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.usersService.delete(req.user, parseInt(userId));
  }

  @RequirePermission(Permission.USER)
  @Get(':id/permissions')
  @UseGuards(PermissionsGuard)
  getUserPermissions(@Param('id') userId: string) {
    return this.usersService.getPermissions(parseInt(userId));
  }
}
