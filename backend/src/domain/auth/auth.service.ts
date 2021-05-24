import { LoggedInUser } from './types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/domain/auth/bcrypt/bcrypt.service';

interface UserLoginParams {
  login: string;
  password: string;
};

export interface ChangePasswordParams { 
  currentPassword: string;
  newPassword: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) { }

  async validateUserLogin(userDto: UserLoginParams): Promise<any> {
    const user = await this.usersService.findByLogin(userDto.login);
    if (user?.isActive && await this.bcryptService.compareHash(userDto.password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: UserLoginParams) {
    const user = await this.validateUserLogin(userDto);
    if (user) {
      const { firstName, lastName, login, id: sub } = user;
      const permissions = (await this.usersService.getPermissions(user.id)).map(uP => uP.permission);
      const payload = { firstName, lastName, login, sub, permissions };
      return {
        access_token: this.jwtService.sign(payload),
        user: {...user, permissions},
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async changePassword(params: ChangePasswordParams, loggedInUser: LoggedInUser) {
    const user = await this.usersService.findById(loggedInUser.id);
    if (user && user.isActive && await this.bcryptService.compareHash(params.currentPassword, user.passwordHash)) {
        return this.usersService.updatePassword(user, params.newPassword);
    }
    
    throw new UnauthorizedException();
  }
}