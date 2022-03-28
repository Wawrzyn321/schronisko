import {
  validateCreate,
  toPrismaUserCreate,
  validateSelfUpdate,
  FrontendUserCreateDto,
  FrontendSelfUpdateDto,
  FrontendUpdateOtherUserDto,
} from './types';
import { UserViewModel } from './../auth/auth.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { Permission, User, UserPermissions } from '@prisma/client';
import { BcryptService } from '../auth/bcrypt.service';
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

  async create(
    user: LoggedInUser,
    userData: FrontendUserCreateDto,
  ): Promise<UserViewModel> {
    if (!validateCreate(userData)) {
      throw new BadRequestException();
    }
    const createdUser = await this.prisma.user.create({
      data: await toPrismaUserCreate(userData, this.bcryptService.hashData),
    });
    await this.logsService.log({
      message: `dodał użytkownika ${createdUser.firstName} ${createdUser.lastName} (${createdUser.login})`,
      permission: Permission.USER,
      user,
    });
    return this.toViewModel(createdUser);
  }

  async updateSelf(
    user: FrontendSelfUpdateDto,
    loggedInUser: LoggedInUser,
  ): Promise<FrontendSelfUpdateDto> {
    if (!validateSelfUpdate(user)) {
      throw new BadRequestException();
    }
    const prevUser = await this.findById(loggedInUser.id);
    if (!prevUser) {
      // shouldn't happpen, but...
      throw new NotFoundException();
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: loggedInUser.id },
      data: user,
    });

    // add passwordHash to satisfy the types
    const prevUserDiffData = {
      login: prevUser.login,
      firstName: prevUser.firstName,
      lastName: prevUser.lastName,
    };
    const diff = formattedDiff(prevUserDiffData, user, [
      { name: 'Login', selector: (n: User) => n.login },
      { name: 'Imię', selector: (n: User) => n.firstName },
      { name: 'Nazwisko', selector: (n: User) => n.lastName },
    ]);

    await this.logsService.log({
      message: `zaktualizował użytkownika ${prevUser.login} (id: ${prevUser.id}) Dane: ${diff}`,
      permission: Permission.USER,
      user: loggedInUser,
    });
    return this.toViewModel(updatedUser);
  }

  async updateOther(
    id: number,
    body: FrontendUpdateOtherUserDto,
    loggedInUser: LoggedInUser,
  ) {
    if (loggedInUser.id === id) {
      throw new ForbiddenException();
    }

    const prevUser = await this.findById(id);
    if (!prevUser) {
      throw new NotFoundException();
    }

    const prevPermissions = await this.getPermissions(id);
    await this.prisma.userPermissions.deleteMany({ where: { userId: id } });

    const permissionNames = {
      USER: 'Użytkownicy',
      PAGE: 'Stałe strony',
      NEWS: 'Newsy',
      ANIMAL: 'Zwierzęta',
    };

    const permissionsDiff = havePermissionsChanged(
      prevPermissions.map((p) => p.permission),
      body.permissions,
    )
      ? ` (Zmienione uprawnienia: ${body.permissions.map(
          (p) => permissionNames[p],
        )})`
      : '';

    const diff = formattedDiff(
      { isActive: prevUser.isActive },
      { isActive: body.isActive },
      [
        {
          name: 'Aktywność',
          selector: (n: { isActive: boolean }) => n.isActive,
        },
      ],
    );

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { isActive: body.isActive },
    });

    await this.prisma.userPermissions.createMany({
      data: body.permissions.map((p) => ({ permission: p, userId: id })),
    });

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
    if (loggedInUser.id === userId) {
      throw new BadRequestException();
    }

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
