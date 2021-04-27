import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { ConstPostsService } from './const-posts.service';
import { BcryptService } from 'src/domain/auth/bcrypt/bcrypt.service';
import { ConstPostsController } from './const-posts.controller';

@Module({
  providers: [ConstPostsService, PrismaService, BcryptService],
  exports: [ConstPostsService],
  controllers: [ConstPostsController],
})
export class ConstPostsModule {}
