import { PermissionsGuard } from './domain/auth/Permissions.guard';
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './domain/auth/auth.service';
import { Public } from './domain/auth/public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }
  
  @UseGuards(PermissionsGuard)
  @Post('auth/change-password')
  async changePassword(@Body() params, @Request() req) {
    return this.authService.changePassword(params, req.user);
  }
}
