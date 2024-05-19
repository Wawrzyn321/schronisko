import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { LoggedInUser } from '../../auth/types';
import { UsersController } from '../users.controller';
import { BcryptService } from '../../auth/bcrypt.service';
import { allPermissions } from '../../auth/constants';
import { UserViewModel } from '../../auth/auth.service';
import { Permission, User } from '@prisma-app/client';
import {
  FrontendUpdateOtherUserDto,
  FrontendSelfUpdateDto,
  FrontendUserCreateDto,
} from '../types';

const mockUserVM: UserViewModel = {
  isActive: true,
  login: 'login',
  firstName: 'fN',
  lastName: 'lN',
  id: 12,
};

const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

const newUserData: FrontendUserCreateDto = {
  login: 'log',
  firstName: 'fName',
  lastName: 'lName',
  password: 'pass',
  permissions: [Permission.ANIMAL],
};

const updateOtherUserData: FrontendUpdateOtherUserDto = {
  isActive: false,
  permissions: [Permission.NEWS],
};

const otherUserMock: User = {
  id: 13,
  login: 'other',
  passwordHash: 'any',
  firstName: 'other-fn',
  lastName: 'other-ln',
  isActive: true,
};

const updateSelfData: FrontendSelfUpdateDto = {
  login: 'log2',
  firstName: 'fName2',
  lastName: 'lName2',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let prismaServiceMock: PrismaService;
  let usersService: UsersService;
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
    usersController = new UsersController(usersService);
  });

  it('GET returns all users', async () => {
    const users: UserViewModel[] = [mockUserVM];
    const getMock = jest.fn().mockReturnValue(Promise.resolve(users));

    prismaServiceMock.user.findMany = getMock;

    const result = await usersController.getUsers();

    expect(result).toEqual(users);
    expect(getMock).toHaveBeenCalled();
  });

  it('GET :id/permissions - gets user permissions', async () => {
    const mockPermissions: Permission[] = [Permission.ANIMAL, Permission.NEWS];
    const findPermissionsMock = jest.fn().mockReturnValue(mockPermissions);

    prismaServiceMock.userPermissions.findMany = findPermissionsMock;

    const result = await usersController.getUserPermissions('10');

    expect(result).toBe(mockPermissions);
    expect(findPermissionsMock).toHaveBeenCalledWith({
      where: { userId: 10 },
    });
  });

  it('POST - invalid data', async () => {
    await expect(
      usersController.createUser(
        { ...newUserData, firstName: '' },
        {
          user: mockAdminUser,
        },
      ),
    ).rejects.toThrow(/Bad Request/);
  });

  it('POST - adds new user', async () => {
    const logMock = jest.fn();
    const createMock = jest.fn().mockReturnValue(Promise.resolve(newUserData));

    logsService.log = logMock;
    prismaServiceMock.user.create = createMock;

    const result = await usersController.createUser(newUserData, {
      user: mockAdminUser,
    });
    expect(result).toEqual(newUserData);

    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.USER,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"dodał użytkownika fName lName (log)"`,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...u } = newUserData;
    expect(createMock).toHaveBeenCalledWith({
      data: {
        ...u,
        isActive: true,
        passwordHash: expect.any(String),
        permissions: { create: [{ permission: Permission.ANIMAL }] },
      },
    });
  });

  it('PATCH (self) - unlikely or rather impossible 404', async () => {
    const findUserMock = jest.fn().mockReturnValue(null);

    prismaServiceMock.user.findUnique = findUserMock;

    await expect(
      usersController.updateUser(updateSelfData, {
        user: mockAdminUser,
      }),
    ).rejects.toThrow(/Not Found/);
    expect(findUserMock).toHaveBeenCalledWith({
      where: { id: mockAdminUser.id },
    });
  });

  it('PATCH (self) - invalid data', async () => {
    await expect(
      usersController.updateUser(
        { ...updateSelfData, firstName: '' },
        {
          user: mockAdminUser,
        },
      ),
    ).rejects.toThrow(/Bad Request/);
  });

  it('PATCH (self) - success', async () => {
    const updatedUser: User = {
      ...mockAdminUser,
      ...updateSelfData,
      passwordHash: 'any',
      isActive: true,
    };
    const logMock = jest.fn();
    const updateMock = jest.fn().mockReturnValue(updatedUser);

    prismaServiceMock.user.findUnique = jest
      .fn()
      .mockReturnValue({ ...mockAdminUser, firstName: 'f-n', lastName: 'l-n' });
    logsService.log = logMock;
    prismaServiceMock.user.update = updateMock;

    await usersController.updateUser(updateSelfData, { user: mockAdminUser });

    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.USER,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"zaktualizował użytkownika test-user-login (id: -1) Dane: (Login: test-user-login -> log2, Imię: f-n -> fName2, Nazwisko: l-n -> lName2)"`,
    );
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: mockAdminUser.id },
      data: updateSelfData,
    });
  });

  it('PATCH (other) - fail trying to update self', async () => {
    await expect(
      usersController.updateOtherUser(
        mockAdminUser.id.toString(),
        updateOtherUserData,
        {
          user: mockAdminUser,
        },
      ),
    ).rejects.toThrow(/Forbidden/);
  });

  it('PATCH (other) - not found', async () => {
    const findUserMock = jest.fn().mockReturnValue(null);

    prismaServiceMock.user.findUnique = findUserMock;

    await expect(
      usersController.updateOtherUser(
        otherUserMock.id.toString(),
        updateOtherUserData,
        { user: mockAdminUser },
      ),
    ).rejects.toThrow(/Not Found/);
    expect(findUserMock).toHaveBeenCalledWith({
      where: { id: otherUserMock.id },
    });
  });

  it('PATCH (other) - success', async () => {
    const deletePermissionsMock = jest.fn();
    const createPermissionsMock = jest.fn();
    const getPermissionsMock = jest.fn().mockReturnValue([Permission.PAGE]);
    const logMock = jest.fn();
    const updateMock = jest.fn().mockReturnValue(otherUserMock);
    const findUserMock = jest.fn().mockReturnValue(otherUserMock);

    prismaServiceMock.userPermissions.deleteMany = deletePermissionsMock;
    prismaServiceMock.userPermissions.createMany = createPermissionsMock;
    usersService.getPermissions = getPermissionsMock;
    prismaServiceMock.user.update = updateMock;
    logsService.log = logMock;
    usersService.findById = findUserMock;

    await usersController.updateOtherUser(
      otherUserMock.id.toString(),
      updateOtherUserData,
      { user: mockAdminUser },
    );

    expect(deletePermissionsMock).toHaveBeenCalledWith({
      where: { userId: otherUserMock.id },
    });
    expect(createPermissionsMock).toHaveBeenCalledWith({
      data: [{ permission: Permission.NEWS, userId: otherUserMock.id }],
    });
    expect(getPermissionsMock).toHaveBeenCalledWith(otherUserMock.id);
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: otherUserMock.id },
      data: { isActive: updateOtherUserData.isActive },
    });
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.USER,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"zaktualizował użytkownika other (id: 13) Dane: (Aktywność: true -> false) (Zmienione uprawnienia: Newsy)"`,
    );
    expect(findUserMock).toHaveBeenCalledWith(otherUserMock.id);
  });

  it('DELETE - cannot delete self', async () => {
    await expect(
      usersController.deleteUser(mockAdminUser.id.toString(), {
        user: mockAdminUser,
      }),
    ).rejects.toThrow(/Bad Request/);
  });

  it('DELETE - deletes user', async () => {
    const deletePermissionsMock = jest.fn();
    const deleteUserMock = jest.fn().mockReturnValue(otherUserMock);
    const logMock = jest.fn();

    prismaServiceMock.userPermissions.deleteMany = deletePermissionsMock;
    prismaServiceMock.user.delete = deleteUserMock;
    logsService.log = logMock;

    const result = await usersController.deleteUser(
      otherUserMock.id.toString(),
      { user: mockAdminUser },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...otherUserMockViewModel } = otherUserMock;
    expect(result).toEqual(otherUserMockViewModel);
    expect(deletePermissionsMock).toHaveBeenCalledWith({
      where: { userId: otherUserMock.id },
    });
    expect(deleteUserMock).toHaveBeenLastCalledWith({
      where: { id: otherUserMock.id },
    });
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.USER,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"usunął użytkownika other-fn other-ln (other)"`,
    );
  });
});
