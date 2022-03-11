import { PrismaService } from 'prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { BcryptService } from '../auth/bcrypt/bcrypt.service';
import { UsersController } from './users.controller';
import { LogsService } from '../logs/logs.service';

@Module({
  providers: [UsersService, PrismaService, BcryptService, LogsService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
