import { Test, TestingModule } from '@nestjs/testing';
import { Permission } from '@prisma-app/client';
import { LogsService } from '../logs.service';
import { PrismaService } from '../../prisma/prisma.service';
import { LoggedInUser } from '../../auth/types';
import { allPermissions } from '../../auth/constants';

const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

describe('LogsService', () => {
  let logsService: LogsService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
  });

  it('log: creates a log', async () => {
    const permission = Permission.ANIMAL;
    const mockLog = {
      userId: mockAdminUser.id,
      login: mockAdminUser.login,
      permission,
    };
    prismaServiceMock.logs.create = jest
      .fn()
      .mockImplementationOnce(({ data }: { data: unknown }) => data);

    const result = await logsService.log({
      message: 'jakas wiadomosc',
      permission,
      user: mockAdminUser,
    });
    expect(result).toMatchObject(mockLog);
    expect(result.message).toMatchInlineSnapshot(
      `"test-user-login jakas wiadomosc"`,
    );
  });
});
