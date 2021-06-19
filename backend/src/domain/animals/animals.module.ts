import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { BcryptService } from 'src/domain/auth/bcrypt/bcrypt.service';
import { AnimalsController } from './animals.controller';

@Module({
  providers: [AnimalsService, PrismaService, BcryptService],
  exports: [AnimalsService],
  controllers: [AnimalsController],
})
export class AnimalsModule {}
