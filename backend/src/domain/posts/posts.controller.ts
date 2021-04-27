import { PostsService } from './posts.service';
import { RequirePriviledge } from '../auth/priviledges.decorator';
import { Controller, Get,UseGuards } from '@nestjs/common';
import { Priviledge } from '@prisma/client';
import { PriviledgesGuard } from '../auth/priviledges.guard';

@Controller('api/posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    // @RequirePriviledge(Priviledge.POST)
    // @Get()
    // @UseGuards(PriviledgesGuard)
    // getUsers() {
    //     return this.postsService.getAll();
    // }
}
