import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { BcryptService } from 'src/domain/auth/bcrypt/bcrypt.service';
import { PostsController } from './posts.controller';

@Module({
  providers: [PostsService, PrismaService, BcryptService],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
