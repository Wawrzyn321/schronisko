import { Controller, Get, Request, Post, UseGuards, Body, Param, Delete } from '@nestjs/common';
import { Priviledge } from '@prisma/client';
import { AuthService } from './auth/auth.service';
import { RequirePriviledge } from './auth/priviledges.decorator';
import { PriviledgesGuard } from './auth/priviledges.guard';
import { Public } from './auth/public.decorator';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private usersService: UsersService) { }

  @Public()
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @RequirePriviledge(Priviledge.USER)
  @Get('api/users')
  @UseGuards(PriviledgesGuard)
  getUsers() {
    return this.usersService.getAll();
  }

  @RequirePriviledge(Priviledge.USER)
  @Post('api/users')
  @UseGuards(PriviledgesGuard)
  createUser(@Body() body) {
    return this.usersService.create(body);
  }

  @RequirePriviledge(Priviledge.USER)
  @Delete('api/users/:id')
  @UseGuards(PriviledgesGuard)
  deleteUser(@Param("id") userId: string) {
    return this.usersService.delete(parseInt(userId));
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
