import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/auth/bcrypt/bcrypt.service';
import { User } from '@prisma/client';

interface UserDto {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) { }

  async validateUser(userDto: UserDto): Promise<Omit<User, "passwordHash">> {
    const user = await this.usersService.findOne(userDto.email);
    if (user && user.isActive && await this.bcryptService.compareHash(userDto.password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    if (user) {
      const { firstName, lastName, email, id:sub } = user;
      const payload = { firstName, lastName, email, sub };
      return {
        access_token: this.jwtService.sign(payload),
        user: user,
      };
    } else {
      return new UnauthorizedException();
    }
  }
}