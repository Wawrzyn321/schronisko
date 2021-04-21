import { toUser, UserDto, validate } from './../prisma-types/UserDto';
import { UserViewModel } from './../prisma-types/viewModels/UserViewModel';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import { User } from '@prisma/client';
import { BcryptService } from 'src/auth/bcrypt/bcrypt.service';
import { PagingParams } from 'src/common/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private bcryptService: BcryptService) { }

  async findOne(email: string = ''): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async getAll(params?: PagingParams): Promise<UserViewModel[]> {
    return await this.prisma.user.findMany(params).then(users => users.map(this.toViewModel));
  }

  async create(user: UserDto): Promise<UserViewModel> {
    if (!validate(user)) {
      throw new BadRequestException();
    }
    return await this.prisma.user.create(
      { data: await toUser(user, this.bcryptService.hashData) }
    ).then(this.toViewModel);
  }

  async delete(userId: number): Promise<UserViewModel> {
    return await this.prisma.user.delete({
      where: { id: userId },
    }).then(this.toViewModel);
  }

  async getPriviledges(userId: number) {
    return await this.prisma.userPriviledges.findMany({ where: { userId } });
  }

  toViewModel(user: User): UserViewModel {
    const { passwordHash, ...u } = user;
    return u;
  }
}
