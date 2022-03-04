import { containsSubsitution, subsitute } from '../../substitutions';
import { Permission } from '@prisma/client';
import { LoggedInUser } from './../auth/types';
import {
  NewsCreateInput,
  NewsUpdateInput,
  NewsModifyParams,
  NewsListElement,
} from './News';
import type { News } from '.prisma/client';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { v4 as uuid } from 'uuid';
import {
  saveImage,
  deleteImage,
  saveImagesFromContentModyfyingIt,
  deleteImagesInContent,
} from '../../img-fs';
import { validateNewsCreate, validateNewsUpdate } from './helpers';
import { LogsService } from '../logs/logs.service';
import { formattedDiff } from '../logs/diff';
import { SettingsService } from '../settings/settings.service';

const imageListElementFields = {
  title: true,
  description: true,
  id: true,
  isPublished: true,
  createdAt: true,
  imageName: true,
};

type GetProps = {
  filterPublic: boolean;
  useSubstitution: boolean;
};

@Injectable()
export class NewsService {
  constructor(
    private prisma: PrismaService,
    private logsService: LogsService,
    private settingsService: SettingsService,
  ) {}

  toListElement(news: News): NewsListElement {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...listElement } = news;
    return listElement;
  }

  async getAll(
    takeTop?: number,
    filterPublic?: boolean,
  ): Promise<NewsListElement[]> {
    return await this.prisma.news.findMany({
      where: { isPublished: filterPublic ? true : undefined },
      select: imageListElementFields,
      take: takeTop,
      orderBy: [{ title: 'asc' }],
    });
  }

  async getRecent(count: number): Promise<NewsListElement[]> {
    return await this.prisma.news.findMany({
      take: count,
      where: { isPublished: true },
      select: imageListElementFields,
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async get(id: string, props: GetProps): Promise<News> {
    const news = await this.prisma.news.findFirst({
      where: { id, isPublished: props.filterPublic ? true : undefined },
    });
    if (!news) {
      throw new NotFoundException();
    }

    if (props.useSubstitution && containsSubsitution(news.content)) {
      const settings = await this.settingsService.getAll();
      news.content = subsitute(news.content, settings);
    }

    return news;
  }

  async create(
    user: LoggedInUser,
    params: NewsModifyParams<NewsCreateInput>,
  ): Promise<NewsListElement> {
    if (!validateNewsCreate(params.news, params.imageData)) {
      throw new BadRequestException(null, 'Brak tytułu lub zdjęcia');
    }

    params.news.content = await saveImagesFromContentModyfyingIt(
      params.news.content,
      params.images,
      'news/',
    );

    params.news.imageName = `${uuid()}.png`;
    await saveImage('news/', params.news.imageName, params.imageData, 'News');
    const createdNews = await this.prisma.news.create({ data: params.news });
    await this.logsService.log({
      message: `dodał newsa ${createdNews.title}`,
      permission: Permission.NEWS,
      user,
    });
    return this.toListElement(createdNews);
  }

  async update(
    user: LoggedInUser,
    id: string,
    params: NewsModifyParams<NewsUpdateInput>,
  ): Promise<NewsListElement> {
    if (!validateNewsUpdate(params.news)) {
      throw new BadRequestException(id, 'Brak tytułu.');
    }
    const prevNews = await this.get(id, {
      filterPublic: false,
      useSubstitution: false,
    });
    if (prevNews.id !== id) {
      throw new BadRequestException(id, 'id musi się zgadzać');
    }

    if (params.imageData) {
      await saveImage('news/', params.news.imageName, params.imageData, 'News');
    }

    await deleteImagesInContent(prevNews.content, params.news.content);

    params.news.content = await saveImagesFromContentModyfyingIt(
      params.news.content,
      params.images,
      'news/',
    );

    const updatedNews = await this.prisma.news.update({
      where: { id },
      data: params.news,
    });

    // add createdAt to satisfy the types
    const diff = formattedDiff(
      prevNews,
      { ...params.news, createdAt: null },
      [
        { name: 'Opis', selector: (n: News) => n.description },
        { name: 'Tytuł', selector: (n: News) => n.title },
        { name: 'Upublicznienie', selector: (n: News) => n.isPublished },
        { name: 'Treść', selector: (n: News) => n.content, omitValues: true },
      ],
      params.imageData ? [{ name: 'Miniaturka' }] : [],
    );

    await this.logsService.log({
      message: `zaktualizował newsa ${updatedNews.title} ${diff}`,
      permission: Permission.NEWS,
      user,
    });
    return this.toListElement(updatedNews);
  }

  async delete(user: LoggedInUser, id: string): Promise<News> {
    const post = await this.prisma.news.findUnique({ where: { id } });
    try {
      await deleteImage('news/', post.imageName);
    } catch (e: unknown) {
      console.warn(e);
    }

    await deleteImagesInContent(post.content);

    const deletedNews = await this.prisma.news.delete({
      where: { id },
    });

    await this.logsService.log({
      message: `usunął newsa ${deletedNews.title}`,
      permission: Permission.NEWS,
      user,
    });
    return deletedNews;
  }
}
