import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { BcryptService } from 'src/domain/auth/bcrypt/bcrypt.service';
import { PagesController } from './pages.controller';

@Module({
  providers: [PagesService, PrismaService, BcryptService],
  exports: [PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
