import { Test, TestingModule } from '@nestjs/testing';
import { Permission } from '@prisma-app/client';
import { allPermissions } from '../../auth/constants';
import { LogsService } from '../logs.service';
import { PrismaService } from '../../prisma/prisma.service';
import { LoggedInUser } from '../../auth/types';
import { LogsController } from '../logs.controller';

const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

describe('LogsController', () => {
  let logsController: LogsController;
  let logsService: LogsService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    logsController = new LogsController(logsService);
  });

  it('GET returns logs, handling parameters', async () => {
    const mockFindMany = jest.fn();
    prismaServiceMock.logs.findMany = mockFindMany;

    await logsController.getLogs('13');
    expect(mockFindMany.mock.calls).toMatchInlineSnapshot(`
[
  [
    {
      "orderBy": [
        {
          "time": "desc",
        },
      ],
      "take": 13,
    },
  ],
]
`);
  });

  it('DELETE deletes all logs, logging single value', async () => {
    const logsServiceLogMock = jest.fn();
    const deleteManyMock = jest.fn();

    logsService.log = logsServiceLogMock;
    prismaServiceMock.logs.deleteMany = deleteManyMock;

    await logsController.deleteLogs({
      user: mockAdminUser,
    });

    expect(deleteManyMock).toHaveBeenCalled();
    expect(logsServiceLogMock).toHaveBeenCalledWith({
      user: mockAdminUser,
      permission: Permission.USER,
      message: 'usunął logi.',
    });
  });
});
