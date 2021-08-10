import { Permission } from '@prisma/client';
import { LoggedInUser } from './../auth/types';
import { NewsCreateInput, NewsUpdateInput, NewsModifyParams, NewsListElement } from './News';
import type { News } from '.prisma/client';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import { v4 as uuid } from 'uuid';
import { saveImage, deleteImage } from './img-fs';
import { validateNewsCreate, validateNewsUpdate } from './helpers';
import { LogsService } from '../logs/logs.service';
import { formattedDiff } from '../logs/diff';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService, private logsService: LogsService) { }

  toListElement(news: News): NewsListElement {
    const { content, ...listElement } = news;
    return listElement;
  }

  async getAll(takeTop?: number): Promise<NewsListElement[]> {
    const fields = { title: true, description: true, id: true, isPublished: true, createdAt: true };
    return await this.prisma.news.findMany({ select: fields, take: takeTop, orderBy: [{ title: 'asc' }] });
  }

  async get(id: string): Promise<News> {
    const news = await this.prisma.news.findUnique({ where: { id } });
    if (!news) {
      throw new NotFoundException();
    }
    return news;
  }

  async create(user: LoggedInUser, params: NewsModifyParams<NewsCreateInput>): Promise<NewsListElement> {
    if (!validateNewsCreate(params.news, params.imageData)) {
      throw new BadRequestException(null, "Brak tytułu lub zdjęcia");
    }

    params.news.imageName = `${uuid()}.png`;
    await saveImage(params.news.imageName, params.imageData, 'News');
    const createdNews = await this.prisma.news.create({ data: params.news });
    await this.logsService.log({
      message: `dodał newsa ${createdNews.title}`,
      permission: Permission.NEWS,
      user,
    });
    return this.toListElement(createdNews);
  }

  async update(user: LoggedInUser, id: string, params: NewsModifyParams<NewsUpdateInput>): Promise<NewsListElement> {
    if (!validateNewsUpdate(params.news)) {
      throw new BadRequestException(id, "Brak tytułu.");
    }
    const prevNews = await this.get(id);
    if (prevNews.id !== id) {
      throw new BadRequestException(id, "id musi się zgadzać");
    }

    if (params.imageData) {
      await saveImage(params.news.imageName, params.imageData, 'News');
    }

    const updatedNews = await this.prisma.news.update({
      where: { id }, data: params.news
    });

    // add createdAt to satisfy the types
    const diff = formattedDiff(prevNews, { ...params.news, createdAt: null }, [
      { name: 'Opis', selector: (n: News) => n.description },
      { name: 'Tytuł', selector: (n: News) => n.title },
      { name: 'Upublicznienie', selector: (n: News) => n.isPublished },
      { name: 'Treść', selector: (n: News) => n.content, omitValues: true },
    ], params.imageData ? [{ name: 'Miniaturka' }] : []);

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
      await deleteImage(post.imageName);
    } catch (e: unknown) {
      console.warn(e);
    }
    const deletedNews = await this.prisma.news.delete({
      where: { id }
    });

    await this.logsService.log({
      message: `usunął newsa ${deletedNews.title}`,
      permission: Permission.NEWS,
      user,
    });
    return deletedNews;
  }
}
