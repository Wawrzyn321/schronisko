import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from '../../settings/settings.service';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { NewsPublicController } from '../news.controller';
import { NewsService } from '../news.service';
import { News, Settings } from '@prisma-app/client';
import { CacheService } from '../../cache/cache.service';
describe('NewsPublicController', () => {
  let newsPublicController: NewsPublicController;
  let newsService: NewsService;
  let prismaServiceMock: PrismaService;
  let settingsService: SettingsService;
  let logsService: LogsService;
  let cacheService: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    cacheService = new CacheService();
    settingsService = new SettingsService(
      prismaServiceMock,
      logsService,
      cacheService,
    );
    newsService = new NewsService(
      prismaServiceMock,
      logsService,
      settingsService,
      cacheService,
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
    const mockSetting: Settings = {
      id: 'KRS_NUMBER',
      value: 'SUBSTITUTED',
    };
    const mockNews: News = {
      content: 'that is %KRS%',
      id: 'news-id',
      title: 'title',
      description: 'desc',
      isPublished: true,
      createdAt: undefined,
      imageName: '',
    };

    settingsService.getAll = jest.fn().mockReturnValue([mockSetting]);
    prismaServiceMock.news.findFirst = jest.fn().mockReturnValue(mockNews);

    const cacheSetMock = jest.fn();
    cacheService.useArticleCache = jest
      .fn()
      .mockReturnValue({ set: cacheSetMock });

    const result = await newsPublicController.getSingleNews('news-id');

    expect(result.id).toBe('news-id');
    expect(result.content).toBe('that is SUBSTITUTED');

    expect(cacheSetMock).toHaveBeenCalledWith(JSON.stringify(mockNews));
  });

  it('GET recent returns recent news', async () => {
    const findManyMock = jest.fn().mockReturnValue([]);
    prismaServiceMock.news.findMany = findManyMock;

    await newsPublicController.getRecentNews('10');

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

    await newsPublicController.getRecentNews('bla');

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

    await newsPublicController.getNews('12');

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

    await newsPublicController.getNews('bla');

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        take: undefined,
        where: { isPublished: true },
        orderBy: [{ title: 'asc' }],
      }),
    );
  });
});
