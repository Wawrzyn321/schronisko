import { Test, TestingModule } from '@nestjs/testing';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { PagesPublicController } from '../pages.controller';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../settings/settings.service';
import { Page, Settings } from '@prisma-app/client';
import { CacheService } from '../../cache/cache.service';
import { SanitizeService } from '../../support/sanitize.service';

describe('PagesPublicController', () => {
  let pagesController: PagesPublicController;
  let pagesService: PagesService;
  let logsService: LogsService;
  let settingsService: SettingsService;
  let prismaServiceMock: PrismaService;
  let cacheService: CacheService;
  const sanitizeService = new SanitizeService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, SanitizeService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    cacheService = new CacheService();
    settingsService = new SettingsService(
      prismaServiceMock,
      logsService,
      cacheService,
      sanitizeService,
    );
    pagesService = new PagesService(
      prismaServiceMock,
      settingsService,
      logsService,
      cacheService,
      sanitizeService,
    );
    pagesController = new PagesPublicController(pagesService);
  });

  it('GET returns page ids for pre render', async () => {
    prismaServiceMock.page.findMany = jest
      .fn()
      .mockReturnValueOnce([{ id: 1 }, { id: 2 }]);

    const result = await pagesController.getPageIdsForPrerender();
    expect(result).toMatchObject([1, 2]);
  });

  it('GET with invalid id returns a 404', async () => {
    prismaServiceMock.page.findUnique = jest.fn().mockReturnValue(null);

    await expect(pagesController.getPage('page-id')).rejects.toThrowError(
      /Not Found/,
    );
  });

  it('GET with valid id returns a page, using substitution', async () => {
    const mockSetting: Settings = {
      id: 'V_ADOPTION_ACCOUNT_NUMBER',
      value: 'SUBSTITUTED',
    };
    const mockPage: Page = {
      id: 'page-id',
      title: 'some-title',
      content: 'this is %KONTO%',
    };
    const findPageMock = jest.fn().mockReturnValue(mockPage);

    prismaServiceMock.page.findUnique = findPageMock;
    settingsService.getAll = jest.fn().mockReturnValue([mockSetting]);

    const result = await pagesController.getPage('page-id');
    expect(result.id).toBe('page-id');
    expect(result.content).toBe('this is SUBSTITUTED');
    expect(settingsService.getAll).toHaveBeenCalled();
    expect(findPageMock).toHaveBeenCalledWith({ where: { id: 'page-id' } });
  });

  it('GET dog-volunteering returns a doggy-on page if setting is true', async () => {
    const mockSetting: Settings = {
      id: 'DOG_VOLUNTEERING_ENABLED',
      value: 'true',
    };
    const getPageMock = jest.fn().mockReturnValue('mock-page');

    settingsService.getAll = jest.fn().mockReturnValueOnce([mockSetting]);
    pagesService.get = getPageMock;

    const result = await pagesController.getDogVolunteeringPage();
    expect(result).toBe('mock-page');
    expect(getPageMock).toHaveBeenCalledWith('wolontariat-pies-on', true);
  });

  it('GET dog-volunteering returns a doggy-off page if setting is missing', async () => {
    const getPageMock = jest.fn().mockReturnValue('mock-page');

    settingsService.getAll = jest.fn().mockReturnValueOnce([]);
    pagesService.get = getPageMock;

    const result = await pagesController.getDogVolunteeringPage();
    expect(result).toBe('mock-page');
    expect(getPageMock).toHaveBeenCalledWith('wolontariat-pies-off', true);
  });

  it('GET dog-volunteering returns a doggy-off page if setting is false', async () => {
    const mockSetting: Settings = {
      id: 'DOG_VOLUNTEERING_ENABLED',
      value: 'false',
    };
    const getPageMock = jest.fn().mockReturnValue('mock-page');

    settingsService.getAll = jest.fn().mockReturnValueOnce([mockSetting]);
    pagesService.get = getPageMock;

    const result = await pagesController.getDogVolunteeringPage();
    expect(result).toBe('mock-page');
    expect(getPageMock).toHaveBeenCalledWith('wolontariat-pies-off', true);
  });
});
