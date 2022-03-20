import { LoggedInUser } from './types';
import { PermissionsGuard } from './guards/Permissions.guard';
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import {
  AuthService,
  ChangePasswordParams,
  UserLoginParams,
  UserViewModel,
} from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Body() user: UserLoginParams) {
    return this.authService.login(user);
  }

  @UseGuards(PermissionsGuard)
  @Post('auth/change-password')
  async changeSelfPassword(
    @Body() params: ChangePasswordParams,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.authService.changeSelfPassword(params, req.user);
  }

  @UseGuards(PermissionsGuard)
  @Post('auth/change-user-password')
  async changePassword(
    @Body() params: { user: UserViewModel; password: string },
  ) {
    return this.authService.changePassword(params.user, params.password);
  }
}
