import { RequirePriviledge } from './../auth/priviledges.decorator';
import { PriviledgesGuard } from './../auth/priviledges.guard';
import { UsersService } from './users.service';
import { Controller, Get, Post, Patch, UseGuards, Body, Param, Delete } from '@nestjs/common';
import { Priviledge } from '@prisma/client';

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @RequirePriviledge(Priviledge.USER)
    @Get()
    @UseGuards(PriviledgesGuard)
    getUsers() {
        return this.usersService.getAll();
    }

    @RequirePriviledge(Priviledge.USER)
    @Post()
    @UseGuards(PriviledgesGuard)
    createUser(@Body() body) {
        return this.usersService.create(body);
    }

    @RequirePriviledge(Priviledge.USER)
    @Patch(':id')
    @UseGuards(PriviledgesGuard)
    updateUser(@Param("id") userId: string, @Body() body) {
        return this.usersService.update(parseInt(userId), body);
    }

    @RequirePriviledge(Priviledge.USER)
    @Delete(':id')
    @UseGuards(PriviledgesGuard)
    deleteUser(@Param("id") userId: string) {
        return this.usersService.delete(parseInt(userId));
    }

    @RequirePriviledge(Priviledge.USER)
    @Get(':id/priviledges')
    @UseGuards(PriviledgesGuard)
    getUserPriviledges(@Param("id") userId: string) {
        return this.usersService.getPriviledges(parseInt(userId));
    }
}
