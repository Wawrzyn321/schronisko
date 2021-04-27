import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { BcryptService } from 'src/domain/auth/bcrypt/bcrypt.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService, BcryptService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
