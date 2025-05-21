import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from '../../settings/settings.service';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NewsPublicController } from '../news.controller';
import { NewsService } from '../news.service';
import { CacheServiceInterface } from '../../cache/interface';
import { SanitizeService } from '../../support/sanitize.service';
import {
  CacheServiceMock,
  CONFIG_SERVICE_MOCK,
  FsServiceMock,
} from '../../../util/testData';
import { FsServiceInterface } from '../../fs/interface';
import { mockNewsWithSubstitution, mockSetting } from './testData';
import { FsService } from '../../fs/fs.service';

describe('NewsPublicController', () => {
  let newsPublicController: NewsPublicController;
  let newsService: NewsService;
  let prismaServiceMock: PrismaService;
  let settingsService: SettingsService;
  let logsService: LogsService;
  let cacheService: CacheServiceInterface;
  let fsService: FsServiceInterface;
  const sanitizeService = new SanitizeService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, FsService, CONFIG_SERVICE_MOCK],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    cacheService = new CacheServiceMock();
    fsService = module.get<FsService>(FsService);
    settingsService = new SettingsService(
      prismaServiceMock,
      logsService,
      cacheService,
      sanitizeService,
    );
    newsService = new NewsService(
      prismaServiceMock,
      logsService,
      settingsService,
      cacheService,
      sanitizeService,
      fsService,
    );
    newsPublicController = new NewsPublicController(newsService);
  });

  it('GET getSingleNews returns 404 for not found/private news', async () => {
    const findFirstMock = jest.fn().mockReturnValue(null);

    prismaServiceMock.news.findFirst = findFirstMock;

    await expect(
      newsPublicController.getSingleNews('some-id'),
    ).rejects.toThrowError(/Not Found/);

    expect(findFirstMock).toHaveBeenCalledWith({
      where: { id: 'some-id', isPublished: true },
    });
  });

  it('GET getSingleNews', async () => {
    settingsService.getAll = jest.fn().mockReturnValue([mockSetting]);
    prismaServiceMock.news.findFirst = jest
      .fn()
      .mockReturnValue(mockNewsWithSubstitution);

    const cacheSetMock = jest.fn();
    cacheService.useArticleCache = jest
      .fn()
      .mockReturnValue({ set: cacheSetMock });

    const result = await newsPublicController.getSingleNews('news-id');

    expect(result.id).toBe('news-id');
    expect(result.content).toBe('that is SUBSTITUTED');

    expect(cacheSetMock).toHaveBeenCalledWith(
      JSON.stringify(mockNewsWithSubstitution),
    );
  });

  it('GET recent returns recent news', async () => {
    const findManyMock = jest.fn().mockReturnValue([]);
    prismaServiceMock.news.findMany = findManyMock;

    await newsPublicController.getRecentNews(10);

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 10,
        where: { isPublished: true },
        orderBy: [{ createdAt: 'desc' }],
      }),
    );
  });

  it('GET recent returns recent news - default value', async () => {
    const findManyMock = jest.fn().mockReturnValue([]);
    prismaServiceMock.news.findMany = findManyMock;

    await newsPublicController.getRecentNews();

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 5,
        where: { isPublished: true },
        orderBy: [{ createdAt: 'desc' }],
      }),
    );
  });

  it('GET returns news', async () => {
    const findManyMock = jest.fn().mockReturnValue([]);
    prismaServiceMock.news.findMany = findManyMock;

    await newsPublicController.getNews(12);

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 12,
        where: { isPublished: true },
        orderBy: [{ title: 'asc' }],
      }),
    );
  });

  it('GET returns news - default value', async () => {
    const findManyMock = jest.fn().mockReturnValue([]);
    prismaServiceMock.news.findMany = findManyMock;

    await newsPublicController.getNews();

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        take: undefined,
        where: { isPublished: true },
        orderBy: [{ title: 'asc' }],
      }),
    );
  });
});
