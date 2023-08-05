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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() user: UserLoginParams) {
    return this.authService.login(user);
  }

  @UseGuards(PermissionsGuard)
  @Post('change-password')
  async changePassword(
    @Body() params: ChangePasswordParams,
    @Request() req: { user: LoggedInUser },
  ) {
    return this.authService.changePassword(params, req.user);
  }

  @UseGuards(PermissionsGuard)
  @Post('change-user-password')
  async changeUserPassword(
    @Body() params: { user: UserViewModel; password: string },
  ) {
    return this.authService.changeUserPassword(params.user, params.password);
  }
}
