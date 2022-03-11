import {
  UserDto,
  validateCreate,
  toUser,
  toUserUpdate,
  validateUpdate,
} from '../types';
import { UserViewModel } from './../auth/auth.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma-connect/prisma.service';
import { Permission, User, UserPermissions } from '@prisma/client';
import { BcryptService } from '../auth/bcrypt/bcrypt.service';
import { LoggedInUser } from '../auth/types';
import { LogsService } from '../logs/logs.service';
import { formattedDiff, havePermissionsChanged } from '../logs/diff';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
    private logsService: LogsService,
  ) {}

  async findByLogin(login = ''): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { login } });
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getAll(): Promise<UserViewModel[]> {
    return await this.prisma.user
      .findMany({ orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }] })
      .then((users: User[]) => users.map(this.toViewModel));
  }

  async create(user: LoggedInUser, userDatta: UserDto): Promise<UserViewModel> {
    if (!validateCreate(userDatta)) {
      throw new BadRequestException();
    }
    const createdUser = await this.prisma.user.create({
      data: await toUser(userDatta, this.bcryptService.hashData),
    });
    await this.logsService.log({
      message: `dodał użytkownika ${createdUser.firstName} ${createdUser.lastName} (${createdUser.login})`,
      permission: Permission.USER,
      user,
    });
    return this.toViewModel(createdUser);
  }

  async update(
    id: number,
    user: UserDto,
    loggedInUser: LoggedInUser,
  ): Promise<UserViewModel> {
    if (
      !loggedInUser.permissions.includes(Permission.USER) &&
      id !== loggedInUser.id
    ) {
      throw new UnauthorizedException();
    }
    if (!validateUpdate(id, user)) {
      throw new BadRequestException();
    }
    const prevUser = await this.findById(user.id);
    if (prevUser?.id !== id) {
      throw new BadRequestException(id, 'id musi się zgadzać');
    }
    const prevPermissions = await this.getPermissions(id);

    await this.prisma.userPermissions.deleteMany({ where: { userId: id } });

    const data = toUserUpdate(user);
    const updatedUser = await this.prisma.user.update({ where: { id }, data });

    // add passwordHash to satisfy the types
    const diff = formattedDiff(prevUser, { ...user, passwordHash: null }, [
      { name: 'Login', selector: (n: User) => n.login },
      { name: 'Imię', selector: (n: User) => n.firstName },
      { name: 'Nazwisko', selector: (n: User) => n.lastName },
      { name: 'Aktywność', selector: (n: User) => n.isActive },
    ]);

    const permissionNames = {
      USER: 'Użytkownicy',
      PAGE: 'Stałe strony',
      NEWS: 'Newsy',
      ANIMAL: 'Zwierzęta',
    };

    const permissionsDiff = havePermissionsChanged(
      prevPermissions.map((p) => p.permission),
      user.permissions,
    )
      ? ` (Zmienione uprawnienia: ${user.permissions.map(
          (p) => permissionNames[p],
        )})`
      : '';

    await this.logsService.log({
      message: `zaktualizował użytkownika ${prevUser.login} (id: ${prevUser.id}) Dane: ${diff}${permissionsDiff}`,
      permission: Permission.USER,
      user: loggedInUser,
    });
    return this.toViewModel(updatedUser);
  }

  async delete(
    loggedInUser: LoggedInUser,
    userId: number,
  ): Promise<UserViewModel> {
    await this.prisma.userPermissions.deleteMany({ where: { userId } });

    const deletedUser = await this.prisma.user.delete({
      where: { id: userId },
    });

    await this.logsService.log({
      message: `usunął użytkownika ${deletedUser.firstName} ${deletedUser.lastName} (${deletedUser.login})`,
      permission: Permission.USER,
      user: loggedInUser,
    });

    return this.toViewModel(deletedUser);
  }

  async getPermissions(userId: number): Promise<UserPermissions[]> {
    return await this.prisma.userPermissions.findMany({ where: { userId } });
  }

  async updatePassword(user: UserViewModel, password: string) {
    const passwordHash = await this.bcryptService.hashData(password);
    return await this.prisma.user
      .update({ where: { id: user.id }, data: { ...user, passwordHash } })
      .then(this.toViewModel);
  }

  toViewModel(user: User): UserViewModel {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...u }: { passwordHash: string } & UserViewModel =
      user;
    return u;
  }
}
