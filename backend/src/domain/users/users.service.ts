import { UserDto, validateCreate, toUser, toUserUpdate, validateUpdate } from '../UserDto';
import { UserViewModel } from './../auth/auth.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import { Permission, User, UserPermissions } from '@prisma/client';
import { BcryptService } from 'src/domain/auth/bcrypt/bcrypt.service';
import { LoggedInUser } from '../auth/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private bcryptService: BcryptService) { }

  async findByLogin(login: string = ''): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { login } });
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getAll(): Promise<UserViewModel[]> {
    return await this.prisma.user
      .findMany({ orderBy: [{ lastName: 'asc'}, {firstName: 'asc' }] })
      .then((users: User[]) => users.map(this.toViewModel));
  }

  async create(user: UserDto): Promise<UserViewModel> {
    if (!validateCreate(user)) {
      throw new BadRequestException();
    }
    return await this.prisma.user.create(
      { data: await toUser(user, this.bcryptService.hashData) }
    ).then(this.toViewModel);
  }

  async update(id: number, user: UserDto, loggedInUser: LoggedInUser): Promise<UserViewModel> {
    if (!loggedInUser.permissions.includes(Permission.USER) && id !== loggedInUser.id) {
      throw new UnauthorizedException();
    }
    if (!validateUpdate(id, user)) {
      throw new BadRequestException();
    }

    await this.prisma.userPermissions.deleteMany({where: { userId: id }})

    const data = toUserUpdate(user);
    return await this.prisma.user.update(
      { where: { id }, data }
    ).then(this.toViewModel);
  }

  async delete(userId: number): Promise<UserViewModel> {
    await this.prisma.userPermissions.deleteMany({where: { userId }})

    return await this.prisma.user.delete({
      where: { id: userId },
    }).then(this.toViewModel);
  }

  async getPermissions(userId: number): Promise<UserPermissions[]> {
    return await this.prisma.userPermissions.findMany({ where: { userId } });
  }

  async updatePassword(user: UserViewModel, password: string) {
    const passwordHash = await this.bcryptService.hashData(password);
    return await this.prisma.user.update(
      { where: { id: user.id }, data: {...user, passwordHash} }
    ).then(this.toViewModel);
  }

  toViewModel(user: User): UserViewModel {
    const { passwordHash, ...u }: {passwordHash: string} & UserViewModel = user;
    return u;
  }
}
