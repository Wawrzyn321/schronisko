import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';

import { BcryptService } from './bcrypt.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

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
    PrismaModule,
  ],
  providers: [AuthService, JwtStrategy, BcryptService, JwtGuard],
  controllers: [AuthController],
})
export class AuthModule {}
