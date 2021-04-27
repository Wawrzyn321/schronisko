import { ConstPostsService } from './const-posts.service';
import { RequirePriviledge } from '../auth/priviledges.decorator';
import { Controller, Get, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { Priviledge } from '@prisma/client';
import { PriviledgesGuard } from '../auth/priviledges.guard';

@Controller('api/const-posts')
export class ConstPostsController {
    constructor(private constPostsService: ConstPostsService) {}

    @RequirePriviledge(Priviledge.CONST_POST)
    @Get()
    @UseGuards(PriviledgesGuard)
    getConstPosts() {
        return this.constPostsService.getAll();
    }

    @RequirePriviledge(Priviledge.CONST_POST)
    @Get(':id')
    @UseGuards(PriviledgesGuard)
    getConstPost(@Param("id") constPostId: string) {
        return this.constPostsService.get(constPostId);
    }

    @RequirePriviledge(Priviledge.CONST_POST)
    @Patch(':id')
    @UseGuards(PriviledgesGuard)
    updateConstPost(@Param("id") constPostId: string, @Body() body) {
        return this.constPostsService.update(constPostId, body);
    }
}
