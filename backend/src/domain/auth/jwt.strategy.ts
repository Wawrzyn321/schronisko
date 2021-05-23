import { Permission } from '@prisma/client';
import { LoggedInUser } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

// todo to common
interface JWTValidationPayload {
  sub: number;
  login: string;
  permissions: Permission[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JWTValidationPayload): Promise<LoggedInUser> {
    return { id: payload.sub, login: payload.login, permissions: payload.permissions };
  }
}
