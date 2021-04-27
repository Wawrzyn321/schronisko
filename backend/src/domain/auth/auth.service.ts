import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/domain/auth/bcrypt/bcrypt.service';

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

  async validateUserLogin(userDto: UserDto): Promise<any> {
    const user = await this.usersService.findOne(userDto.email);
    if (user && user.isActive && await this.bcryptService.compareHash(userDto.password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: UserDto) {
    const user = await this.validateUserLogin(userDto);
    if (user) {
      const { firstName, lastName, email, id: sub } = user;
      const priviledges = (await this.usersService.getPriviledges(user.id)).map(uP => uP.priviledge);
      const payload = { firstName, lastName, email, sub, priviledges };
      return {
        access_token: this.jwtService.sign(payload),
        user: {...user, priviledges},
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}