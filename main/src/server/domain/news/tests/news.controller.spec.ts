import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from '../../settings/settings.service';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { NewsController } from '../news.controller';
import { NewsService } from '../news.service';
import { News, Permission } from '@prisma/client';
import { LoggedInUser } from '../../../domain/auth/types';
import { allPermissions } from '../../../domain/auth/constants';
import { NewsCreateInput, NewsModifyParams, NewsUpdateInput } from '../News';

const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

const mockNews: News = {
  id: '15',
  title: 'test-news',
  description: 'test-desc',
  content: 'test-content',
  isPublished: false,
  createdAt: undefined,
  imageName: 'test-img-name',
};

const mockNewsCreate: NewsModifyParams<NewsCreateInput> = {
  news: {
    title: 'test-title',
    description: 'test-desc',
    isPublished: false,
    content: 'test-content',
    imageName: 'test-image-name',
  },
  images: [
    {
      base64: 'images_image-base-64',
      name: 'images_image-name',
    },
  ],
  imageData: 'test-image-data',
};

const mockNewsUpdate: NewsModifyParams<NewsUpdateInput> = {
  news: {
    title: 'test-title',
    description: 'test-desc-2',
    isPublished: true,
    content: 'test-content',
    imageName: 'test-image-name-2',
    id: '15',
    imagePath: '/test-path',
  },
  images: [],
  imageData: 'test-image-data',
};

const mockUnlink = jest.fn();
const mockWriteFile = jest.fn();
jest.mock('fs', () => ({
  ...(jest.requireActual('fs') as object),
  promises: {
    ...jest.requireActual('fs').promises,
    unlink: (...args: any) => mockUnlink(...args),
    writeFile: (...args: any) => mockWriteFile(...args),
  },
}));

jest.mock('sharp', () => (buffer: Buffer) => ({
  resize: () => ({
    toBuffer: () =>
      Promise.resolve('mock file content ' + buffer.toString('base64')),
  }),
}));

describe('NewsController', () => {
  let newsController: NewsController;
  let newsService: NewsService;
  let prismaServiceMock: PrismaService;
  let settingsService: SettingsService;
  let logsService: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    settingsService = new SettingsService(prismaServiceMock, logsService);
    newsService = new NewsService(
      prismaServiceMock,
      logsService,
      settingsService,
    );
    newsController = new NewsController(newsService);
  });

  it('GET with no valid params returns all news', async () => {
    const findNewsMock = jest.fn().mockReturnValue('news');
    prismaServiceMock.news.findMany = findNewsMock;

    const result = await newsController.getNews('blah');

    expect(result).toBe('news');
    expect(findNewsMock).toHaveBeenCalledWith({
      where: { isPublished: undefined },
      select: expect.any(Object),
      take: undefined,
      orderBy: [{ title: 'asc' }],
    });
  });

  it('GET one with valid id returns news with unsubsituted content', async () => {
    prismaServiceMock.news.findFirst = jest.fn().mockReturnValue(mockNews);

    const result = await newsController.getSingleNews('15');

    expect(result).toMatchObject(mockNews);
    expect(prismaServiceMock.news.findFirst).toHaveBeenCalledWith({
      where: { id: '15' },
    });
  });

  it('GET one returns 404 on invalid id', async () => {
    prismaServiceMock.news.findFirst = jest.fn().mockReturnValue(null);

    await expect(newsController.getSingleNews('15')).rejects.toThrow(
      'Not Found',
    );
  });

  it('GET with valid params returns n news', async () => {
    const findPagesMock = jest.fn().mockReturnValue('news');
    prismaServiceMock.news.findMany = findPagesMock;

    const result = await newsController.getNews('15');

    expect(result).toBe('news');
    expect(findPagesMock).toHaveBeenCalledWith(
      expect.objectContaining({ take: 15 }),
    );
  });

  it('POST throws on invalid data', async () => {
    await expect(
      newsController.createNews(
        { ...mockNewsCreate, imageData: null },
        {
          user: mockAdminUser,
        },
      ),
    ).rejects.toThrow('Brak tytułu lub zdjęcia');
  });

  it('POST throws on invalid data', async () => {
    await expect(
      newsController.createNews(
        { ...mockNewsCreate, imageData: null },
        {
          user: mockAdminUser,
        },
      ),
    ).rejects.toThrow('Brak tytułu lub zdjęcia');
  });

  it('POST creates a news on valid data', async () => {
    mockWriteFile.mockReset();
    const logMock = jest.fn();
    const createNewsMock = jest.fn().mockReturnValue(mockNews);

    prismaServiceMock.news.create = createNewsMock;
    logsService.log = logMock;

    const result = await newsController.createNews(mockNewsCreate, {
      user: mockAdminUser,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...expectedMock } = mockNews;
    expect(result).toMatchObject(expectedMock);
    expect(mockWriteFile).toHaveBeenCalledTimes(2);
    // news images
    expect(mockWriteFile).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching('images_image-name'),
      expect.stringMatching('mock file content'),
    );
    // main news image
    expect(mockWriteFile).toHaveBeenNthCalledWith(
      2,
      expect.stringMatching('.png'),
      expect.stringMatching('mock file content'),
    );
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.NEWS,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"dodał newsa test-news"`,
    );
  });

  it('PATCH throws if newsId mismatches param news id', async () => {
    await expect(
      newsController.updateNews('-1', mockNewsUpdate, {
        user: mockAdminUser,
      }),
    ).rejects.toThrow('Bad Request');
  });

  it('PATCH throws if params are invalid', async () => {
    const params = {
      ...mockNewsUpdate,
      news: { ...mockNewsUpdate.news, title: '' },
    };

    await expect(
      newsController.updateNews(mockNewsUpdate.news.id, params, {
        user: mockAdminUser,
      }),
    ).rejects.toThrow('15');
  });

  it('PATCH updates news and images', async () => {
    mockWriteFile.mockReset();
    mockUnlink.mockReset();

    const mockNewsUpdateFn = jest.fn().mockReturnValue(mockNewsUpdate.news);
    const mockGetNews = jest.fn().mockReturnValue(mockNews);
    const logMock = jest.fn();

    logsService.log = logMock;
    prismaServiceMock.news.update = mockNewsUpdateFn;
    newsService.get = mockGetNews;

    const result = await newsController.updateNews(
      mockNewsUpdate.news.id,
      mockNewsUpdate,
      {
        user: mockAdminUser,
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, createdAt, ...expectedMock } = {
      ...mockNews,
      ...mockNewsUpdate.news,
    };
    expect(result).toMatchObject(expectedMock);
    expect(mockNewsUpdateFn).toHaveBeenCalledWith({
      data: mockNewsUpdate.news,
      where: { id: mockNewsUpdate.news.id },
    });
    expect(mockGetNews).toHaveBeenCalledWith(mockNewsUpdate.news.id, {
      filterPublic: false,
      useSubstitution: false,
    });
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.NEWS,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"zaktualizował newsa test-title (Opis: test-desc -> test-desc-2, Tytuł: test-news -> test-title, Upublicznienie: false -> true, Miniaturka)"`,
    );
  });

  it('DELETE with valid id deletes a news', async () => {
    mockUnlink.mockReset();
    const deleteNewsMock = jest.fn().mockReturnValue(mockNews);
    const findUniqueMock = jest.fn().mockReturnValue(mockNews);
    const logMock = jest.fn();

    logsService.log = logMock;
    prismaServiceMock.news.delete = deleteNewsMock;
    prismaServiceMock.news.findUnique = findUniqueMock;

    const result = await newsController.deleteNews('15', {
      user: mockAdminUser,
    });

    expect(result).toMatchObject(mockNews);
    expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: '15' } });
    expect(deleteNewsMock).toHaveBeenCalledWith({ where: { id: '15' } });
    expect(logMock).toHaveBeenCalledWith({
      message: expect.any(String),
      permission: Permission.NEWS,
      user: mockAdminUser,
    });
    expect(logMock.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"usunął newsa test-news"`,
    );
    expect(mockUnlink).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp('img/news/test-img-name')),
    );
  });

  it('DELETE returns 404 on page not found', async () => {
    prismaServiceMock.news.findUnique = jest.fn().mockReturnValue(null);

    await expect(
      newsController.deleteNews('15', {
        user: mockAdminUser,
      }),
    ).rejects.toThrow('Not Found');
  });
});
