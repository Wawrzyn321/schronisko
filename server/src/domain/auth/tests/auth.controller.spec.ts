import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Permission, User, UserPermissions } from '@prisma-app/client';
import { UsersService } from '../../users/users.service';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../prisma/prisma.service';
import { LoggedInUser } from '../types';
import { AuthController } from '../auth.controller';
import {
  AuthService,
  ChangePasswordParams,
  UserLoginParams,
  UserViewModel,
} from '../auth.service';
import { BcryptService } from '../bcrypt.service';
import { allPermissions } from '../constants';

const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

const mockUserVM: UserViewModel = {
  isActive: true,
  login: 'login',
  firstName: 'fN',
  lastName: 'lN',
  id: 12,
};
const mockUser: User = {
  ...mockUserVM,
  passwordHash: 'hash',
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let prismaServiceMock: PrismaService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let bcryptService: BcryptService;
  let logsService: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    bcryptService = new BcryptService();
    logsService = new LogsService(prismaServiceMock);
    usersService = new UsersService(
      prismaServiceMock,
      bcryptService,
      logsService,
    );
    jwtService = new JwtService({ secret: 'mockSecretKey' });
    authService = new AuthService(usersService, jwtService, bcryptService);
    authController = new AuthController(authService);
  });

  it('POST login - user not found', async () => {
    const params: UserLoginParams = {
      login: 'login',
      password: 'password',
    };

    const findUserMock = jest.fn().mockReturnValue(null);
    prismaServiceMock.user.findUnique = findUserMock;

    await expect(authController.login(params)).rejects.toThrow('Unauthorized');
    expect(findUserMock).toHaveBeenCalledWith({ where: { login: 'login' } });
  });

  it('POST login - user not active', async () => {
    const params: UserLoginParams = {
      login: 'login',
      password: 'password',
    };

    prismaServiceMock.user.findUnique = jest
      .fn()
      .mockReturnValue({ isActive: false });

    await expect(authController.login(params)).rejects.toThrow('Unauthorized');
  });

  it('POST login - invalid password', async () => {
    const params: UserLoginParams = {
      login: 'login',
      password: 'password',
    };
    const compareHashMock = jest.fn().mockReturnValue(false);

    prismaServiceMock.user.findUnique = jest
      .fn()
      .mockReturnValue({ isActive: true, passwordHash: 'hash' });
    bcryptService.compareHash = compareHashMock;

    await expect(authController.login(params)).rejects.toThrow('Unauthorized');
    expect(compareHashMock).toHaveBeenCalledWith('password', 'hash');
  });

  it('POST login - success', async () => {
    const params: UserLoginParams = {
      login: 'login',
      password: 'password',
    };
    const mockPermissions: UserPermissions[] = [
      { userId: mockUser.id, permission: Permission.ANIMAL },
    ];

    const getPermissionsMock = jest.fn().mockReturnValue(mockPermissions);

    prismaServiceMock.user.findUnique = jest.fn().mockReturnValue(mockUser);
    prismaServiceMock.userPermissions.findMany = getPermissionsMock;
    bcryptService.compareHash = jest.fn().mockReturnValue(true);

    const result = await authController.login(params);

    expect(result.access_token).toBeTruthy();
    expect(result.user).toEqual({
      ...mockUserVM,
      permissions: [Permission.ANIMAL],
    });
    expect(getPermissionsMock).toHaveBeenCalledWith({
      where: { userId: mockUser.id },
    });
  });

  it('POST change-password - user not found', async () => {
    const params: ChangePasswordParams = {
      currentPassword: 'current',
      newPassword: 'new',
    };
    const findUserMock = jest.fn().mockReturnValue(null);
    prismaServiceMock.user.findUnique = findUserMock;

    await expect(
      authController.changePassword(params, { user: mockAdminUser }),
    ).rejects.toThrow(/Not Found/);

    expect(findUserMock).toHaveBeenCalledWith({ where: { id: -1 } });
  });

  it('POST change-password - invalid current password', async () => {
    const params: ChangePasswordParams = {
      currentPassword: 'current',
      newPassword: 'new',
    };
    const mockUser: User = {
      isActive: true,
      login: 'login',
      firstName: 'fN',
      lastName: 'lN',
      id: -1,
      passwordHash: 'hash',
    };
    const compareHashMock = jest.fn().mockReturnValue(false);

    prismaServiceMock.user.findUnique = jest.fn().mockReturnValue(mockUser);
    bcryptService.compareHash = compareHashMock;

    await expect(
      authController.changePassword(params, { user: mockAdminUser }),
    ).rejects.toThrow(/Forbidden/);

    expect(compareHashMock).toHaveBeenCalledWith('current', 'hash');
  });

  it('POST change-password - success', async () => {
    const params: ChangePasswordParams = {
      currentPassword: 'current',
      newPassword: 'new',
    };
    const updateMock = jest.fn().mockReturnValue(Promise.resolve(mockUser));

    prismaServiceMock.user.findUnique = jest.fn().mockReturnValue(mockUser);
    bcryptService.compareHash = jest.fn().mockReturnValue(true);
    prismaServiceMock.user.update = updateMock;

    const result = await authController.changePassword(params, {
      user: mockAdminUser,
    });
    expect(result).toEqual(mockUserVM);
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      data: { ...mockUserVM, passwordHash: expect.any(String) },
    });
  });

  it('POST change-user-password - user not found', async () => {
    const params: { user: UserViewModel; password: string } = {
      user: mockUserVM,
      password: 'password',
    };

    const findUserMock = jest.fn().mockReturnValue(null);
    prismaServiceMock.user.findUnique = findUserMock;

    await expect(authController.changeUserPassword(params)).rejects.toThrow(
      /Not Found/,
    );

    expect(findUserMock).toHaveBeenCalledWith({ where: { id: mockUser.id } });
  });

  it('POST change-user-password - success', async () => {
    const params: { user: UserViewModel; password: string } = {
      user: mockUserVM,
      password: 'password',
    };
    const mockUpdate = jest.fn().mockReturnValue(Promise.resolve(mockUser));

    prismaServiceMock.user.findUnique = jest.fn().mockReturnValue(mockUser);
    prismaServiceMock.user.update = mockUpdate;

    const result = await authController.changeUserPassword(params);
    expect(result).toEqual(mockUserVM);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      data: { ...mockUserVM, passwordHash: expect.any(String) },
    });
  });
});
