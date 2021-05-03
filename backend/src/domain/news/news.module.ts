import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { BcryptService } from 'src/domain/auth/bcrypt/bcrypt.service';
import { NewsController } from './news.controller';

@Module({
  providers: [NewsService, PrismaService, BcryptService],
  exports: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
