import { Test, TestingModule } from '@nestjs/testing';
import { LogsService } from '../../logs/logs.service';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { PagesController } from '../pages.controller';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../../domain/settings/settings.service';
import { Page, Permission } from '@prisma/client';
import { ImageData } from 'img-fs';
import { LoggedInUser } from '../../../domain/auth/types';
import { allPermissions } from '../../../domain/auth/constants';

const mockAdminUser: LoggedInUser = {
  id: -1,
  login: 'test-user-login',
  permissions: allPermissions,
};

const mockWriteFile = jest.fn();
jest.mock('fs', () => ({
  ...(jest.requireActual('fs') as object),
  promises: {
    ...jest.requireActual('fs').promises,
    writeFile: (...args: any) => mockWriteFile(...args),
  },
}));

jest.mock('sharp', () => (buffer: Buffer) => ({
  resize: () => ({
    toBuffer: () =>
      Promise.resolve('mock file content ' + buffer.toString('base64')),
  }),
}));

const mockPage: Page = {
  id: '12',
  title: 'page-title',
  content: 'page-content',
};

const body: { page: Page; images: ImageData[] } = {
  page: { id: '12', title: 'page-title-2', content: 'page-content-2' },
  images: [{ name: 'mock-image-name', base64: 'mock-base-64' }],
};

describe('PagesController', () => {
  let pagesController: PagesController;
  let pagesService: PagesService;
  let logsService: LogsService;
  let settingsService: SettingsService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    logsService = new LogsService(prismaServiceMock);
    settingsService = new SettingsService(prismaServiceMock, logsService);
    pagesService = new PagesService(
      prismaServiceMock,
      settingsService,
      logsService,
    );
    pagesController = new PagesController(pagesService);
  });

  it('GET with no valid params returns all pages', async () => {
    prismaServiceMock.page.findMany = jest.fn().mockReturnValue('pages');

    const result = await pagesController.getPages('blah');

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

    const result = await pagesController.getPages('10');

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

  it('GET one returns page for valid id', async () => {
    prismaServiceMock.page.findUnique = jest.fn().mockReturnValue(mockPage);

    const result = await pagesController.getPage(mockPage.id);
    expect(result).toBe(mockPage);
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
    expect(mockWriteFile).toHaveBeenCalledWith(
      expect.stringContaining('/img/mock-image-name'),
      expect.stringContaining('mock file content'),
    );
  });
});
