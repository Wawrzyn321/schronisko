import { containsSubsitution, substitute } from '../../util/substitutions';
import { Permission } from '@prisma-app/client';
import { LoggedInUser } from '../auth/types';
import {
  NewsCreateInput,
  NewsUpdateInput,
  NewsModifyParams,
  NewsListElement,
} from './News';
import type { News } from '@prisma-app/client';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import {
  saveImage,
  deleteImage,
  saveImagesFromContentModyfyingIt,
  deleteImagesInContent,
} from '../../util/img-fs';
import { validateNewsCreate, validateNewsUpdate } from './helpers';
import { LogsService } from '../logs/logs.service';
import { formattedDiff } from '../logs/diff';
import { SettingsService } from '../settings/settings.service';
import { SanitizeService } from '../support/sanitize.service';
import { randomUUID } from 'crypto';
import { CacheServiceInterface } from '../../domain/cache/interface';

const imageListElementFields = {
  title: true,
  description: true,
  id: true,
  isPublished: true,
  createdAt: true,
  imageName: true,
};

type GetProps = {
  onlyPublic: boolean;
  useSubstitution: boolean;
};

@Injectable()
export class NewsService {
  constructor(
    private prisma: PrismaService,
    private logsService: LogsService,
    private settingsService: SettingsService,
    private cacheService: CacheServiceInterface,
    private sanitizeService: SanitizeService,
  ) {}

  toListElement(news: News): NewsListElement {
    const { content, ...listElement } = news;
    return listElement;
  }

  async getAll(
    takeTop?: number,
    onlyPublic?: boolean,
  ): Promise<NewsListElement[]> {
    return await this.prisma.news.findMany({
      where: { isPublished: onlyPublic ? true : undefined },
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
    const cache = await this.cacheService.useArticleCache(
      'news',
      id,
      props.useSubstitution,
    );

    if (cache && cache.value) {
      const cachedValue = JSON.parse(cache.value) as News | null;
      if (cachedValue && (cachedValue.isPublished || !props.onlyPublic)) {
        return cachedValue;
      }
    }

    const news = await this.prisma.news.findFirst({
      where: { id, isPublished: props.onlyPublic ? true : undefined },
    });
    if (!news) {
      throw new NotFoundException();
    }

    if (props.useSubstitution && containsSubsitution(news.content)) {
      const settings = await this.settingsService.getAll();
      news.content = substitute(news.content, settings);
    }

    cache?.set(JSON.stringify(news));

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
      'news',
    );
    params.news.content = this.sanitizeService.sanitizeHtml(
      params.news.content,
    );

    params.news.imageName = `${randomUUID()}.png`;
    await saveImage({
      subdir: 'news/',
      name: params.news.imageName,
      base64Data: params.imageData,
      resizingPreset: 'News',
    });
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
    const cache = await this.cacheService.useArticleCache('news', id);

    if (id !== params?.news?.id) {
      throw new BadRequestException();
    }
    if (!validateNewsUpdate(params.news)) {
      throw new BadRequestException(id, 'Brak tytułu.');
    }
    const prevNews = await this.get(id, {
      onlyPublic: false,
      useSubstitution: false,
    });

    if (params.imageData) {
      await saveImage({
        subdir: 'news/',
        name: params.news.imageName,
        base64Data: params.imageData,
        resizingPreset: 'News',
      });
    }
    await deleteImagesInContent(prevNews.content, params.news.content);

    params.news.content = await saveImagesFromContentModyfyingIt(
      params.news.content,
      params.images,
      'news',
    );
    params.news.content = this.sanitizeService.sanitizeHtml(
      params.news.content,
    );

    const updatedNews = await this.prisma.news.update({
      where: { id },
      data: params.news,
    });

    // add createdAt to satisfy the types
    const diff = formattedDiff(
      prevNews,
      { ...params.news, createdAt: new Date() },
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

    await cache?.clear();

    return this.toListElement(updatedNews);
  }

  async delete(user: LoggedInUser, id: string): Promise<News> {
    const news = await this.prisma.news.findUnique({ where: { id } });
    if (!news) {
      throw new NotFoundException();
    }
    try {
      await deleteImage('news/', news.imageName);
    } catch (e: unknown) {
      console.warn(e);
    }

    await deleteImagesInContent(news.content);

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
