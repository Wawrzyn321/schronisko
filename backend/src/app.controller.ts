import { Controller, Get, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/auth.module';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Get('tets')
  tets(@Request() req) {
    return 2;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
