import { Controller, Get, Request, Post, UseGuards, HttpCode, Body } from '@nestjs/common';
import { Priviledge } from '@prisma/client';
import { AuthService } from './auth/auth.service';
import { DUPA } from './auth/priviledges.decorator';
import { PriviledgesGuard } from './auth/priviledges.guard';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @DUPA(Priviledge.USER)
  @Get('tets')
  @UseGuards(PriviledgesGuard)
  tets(@Request() req) {
    return 2;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
