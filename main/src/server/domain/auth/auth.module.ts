import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';

import { BcryptService } from './bcrypt.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma-connect/prisma.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const JwtGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.ttl },
    }),
  ],
  providers: [AuthService, JwtStrategy, BcryptService, PrismaService, JwtGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
