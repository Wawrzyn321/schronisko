import { Controller, Post, Body } from '@nestjs/common';
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

  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
