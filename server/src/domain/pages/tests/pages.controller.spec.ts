import { Test, TestingModule } from '@nestjs/testing';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PagesController } from '../pages.controller';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../settings/settings.service';
import { Page, Permission, Settings } from '@prisma-app/client';
import { CacheServiceInterface } from '../../cache/interface';
import { CacheServiceMock, FsServiceMock } from '../../../util/testData';
import { SanitizeService } from '../..//support/sanitize.service';
import { FsServiceInterface } from '../../fs/interface';
import { body, mockAdminUser, mockPage } from './testData';

const mockWriteFile = jest.fn();
jest.mock('fs', () => ({
  existsSync: jest.fn(() => true),
  // needed for Prisma
  readFileSync: jest.requireActual('fs').readFileSync,
  promises: {
    writeFile: (...args: any) => mockWriteFile(...args),
  },
}));

jest.mock('sharp', () => (buffer: Buffer) => ({
  resize: () => ({
    toBuffer: () =>
      Promise.resolve('mock file content ' + buffer.toString('base64')),
  }),
}));

describe('PagesController', () => {
  let pagesController: PagesController;
  let pagesService: PagesService;
  let logsService: LogsService;
  let settingsService: SettingsService;
  let prismaServiceMock: PrismaService;
  let cacheService: CacheServiceInterface;
  let fsService: FsServiceInterface;
  const sanitizeService = new SanitizeService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    cacheService = new CacheServiceMock();
    fsService = new FsServiceMock();
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
      fsService,
    );
    pagesController = new PagesController(pagesService);
  });

  it('GET returns page ids for pre render', async () => {
    prismaServiceMock.page.findMany = jest
      .fn()
      .mockReturnValueOnce([{ id: 1 }, { id: 2 }]);

    const result = await pagesController.getPageIdsForPrerender();
    expect(result).toMatchObject([1, 2]);
  });

  it('GET with no valid params returns all pages', async () => {
    prismaServiceMock.page.findMany = jest.fn().mockReturnValue('pages');

    const result = await pagesController.getPages();

    expect(result).toBe('pages');
    expect(prismaServiceMock.page.findMany).toHaveBeenCalledWith({
      orderBy: [
        {
          title: 'asc',
        },
      ],
      select: {
        id: true,
        title: true,
      },
      take: undefined,
    });
  });

  it('GET one with valid id returns page with unsubsituted content', async () => {
    prismaServiceMock.page.findMany = jest.fn().mockReturnValue(mockPage);

    const result = await pagesController.getPages(10);

    expect(result).toMatchObject(mockPage);
    expect(prismaServiceMock.page.findMany).toHaveBeenCalledWith({
      orderBy: [
        {
          title: 'asc',
        },
      ],
      select: {
        id: true,
        title: true,
      },
      take: 10,
    });
  });

  it('GET one returns 404 if not found', async () => {
    prismaServiceMock.page.findUnique = jest.fn().mockReturnValue(null);

    await expect(pagesController.getPage('blah')).rejects.toThrow('Not Found');
    expect(prismaServiceMock.page.findUnique).toHaveBeenCalledWith({
      where: { id: 'blah' },
    });
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

  it('GET with valid id returns a page, substitution disabled', async () => {
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

    const result = await pagesController.getPage('page-id', false);
    expect(result.id).toBe('page-id');
    expect(result.content).toBe('this is %KONTO%');
  });

  it('PATCH throws if page is not found', async () => {
    prismaServiceMock.page.findUnique = jest.fn().mockReturnValue(null);

    await expect(
      pagesController.updatePage('blah', body, { user: mockAdminUser }),
    ).rejects.toThrow('Not Found');
    expect(prismaServiceMock.page.findUnique).toHaveBeenCalledWith({
      where: { id: 'blah' },
    });
  });

  it('PATCH throws on id mismatch', async () => {
    prismaServiceMock.page.findUnique = jest.fn().mockReturnValue(mockPage);

    await expect(
      pagesController.updatePage('blah', body, { user: mockAdminUser }),
    ).rejects.toThrow('blah');
  });

  it('PATCH updates page', async () => {
    const logMock = jest.fn();
    prismaServiceMock.page.findUnique = jest.fn().mockReturnValue(mockPage);
    prismaServiceMock.page.update = jest.fn().mockReturnValue(body.page);
    logsService.log = logMock;

    const cacheClearMock = jest.fn();
    const cacheSetMock = jest.fn();
    cacheService.useArticleCache = jest
      .fn()
      .mockReturnValue({ clear: cacheClearMock, set: cacheSetMock });

    const result = await pagesController.updatePage(body.page.id, body, {
      user: mockAdminUser,
    });

    expect(result).toMatchObject(body.page);
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.PAGE,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"zaktualizował stronę page-title-2 (id: 12) (Treść, Tytuł: page-title -> page-title-2)"`,
    );
    // expect(mockWriteFile).toHaveBeenCalledWith(
    //   expect.stringContaining('../images/img/pages/mock-image-name'),
    //   expect.stringContaining('mock file content'),
    // );

    expect(cacheClearMock).toHaveBeenCalled();
    expect(cacheSetMock).toHaveBeenCalledWith(JSON.stringify(mockPage));
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
    expect(getPageMock).toHaveBeenCalledWith('wolontariat-pies-on', {
      useSubstitution: true,
    });
  });

  it('GET dog-volunteering returns a doggy-off page if setting is missing', async () => {
    const getPageMock = jest.fn().mockReturnValue('mock-page');

    settingsService.getAll = jest.fn().mockReturnValueOnce([]);
    pagesService.get = getPageMock;

    const result = await pagesController.getDogVolunteeringPage();
    expect(result).toBe('mock-page');
    expect(getPageMock).toHaveBeenCalledWith('wolontariat-pies-off', {
      useSubstitution: true,
    });
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
    expect(getPageMock).toHaveBeenCalledWith('wolontariat-pies-off', {
      useSubstitution: true,
    });
  });
});
