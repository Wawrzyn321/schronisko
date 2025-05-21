import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { BcryptService } from '../auth/bcrypt.service';
import { UsersController } from './users.controller';
import { LogsModule } from '../logs/logs.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [LogsModule, PrismaModule],
  providers: [UsersService, BcryptService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
