import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/auth/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await this.bcryptService.compareHash(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if (await this.validateUser(user.email, user.password)) {
      const payload = { email: user.email, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return new UnauthorizedException();
    }
  }
}