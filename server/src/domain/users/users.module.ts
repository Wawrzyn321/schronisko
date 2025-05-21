import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { BcryptService } from '../auth/bcrypt.service';
import { UsersController } from './users.controller';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [LogsModule],
  providers: [UsersService, PrismaService, BcryptService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
