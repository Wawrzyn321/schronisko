import { Test, TestingModule } from '@nestjs/testing';
import { Permission, Settings } from '@prisma-app/client';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SettingsController } from '../settings.controller';
import { SettingsService } from '../settings.service';
import { LoggedInUser } from '../../auth/types';
import { allPermissions } from '../../auth/constants';
import { CacheServiceMock } from '../../../util/testData';
import { SanitizeService } from '../../support/sanitize.service';
import { CacheServiceInterface } from '../../cache/interface';

const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

describe('SettingsController', () => {
  let settingsController: SettingsController;
  let settingsService: SettingsService;
  let logsService: LogsService;
  let prismaServiceMock: PrismaService;
  let cacheService: CacheServiceInterface;
  const sanitizeService = new SanitizeService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    cacheService = new CacheServiceMock();
    settingsService = new SettingsService(
      prismaServiceMock,
      logsService,
      cacheService,
      sanitizeService,
    );
    settingsController = new SettingsController(settingsService);
  });

  it('GET returns all settings', async () => {
    const mockSetting: Settings = {
      id: 'foo',
      value: 'bar',
    };
    prismaServiceMock.settings.findMany = jest
      .fn()
      .mockReturnValueOnce([mockSetting]);

    const result = await settingsController.getSettings();
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(mockSetting);
  });

  it("PUT creates a setting if didn't exist", async () => {
    const mockSetting = {
      id: 'SETTING_ID',
      value: 'SETTING_VALUE',
    };

    const settingCreateMock = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(mockSetting));
    const logsServiceLogMock = jest.fn();

    logsService.log = logsServiceLogMock;
    prismaServiceMock.settings.findFirst = jest.fn().mockReturnValueOnce(null);
    prismaServiceMock.settings.create = settingCreateMock;

    const result = await settingsController.upsertSetting(
      mockSetting.id,
      mockSetting.value,
      {
        user: mockAdminUser,
      },
    );

    expect(result).toMatchObject(mockSetting);
    expect(settingCreateMock).toHaveBeenCalledWith({ data: mockSetting });
    expect(logsServiceLogMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.USER,
      user: mockAdminUser,
    });
    expect(logsServiceLogMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"dodał ustawienie SETTING_ID o wartości SETTING_VALUE"`,
    );
  });
});
