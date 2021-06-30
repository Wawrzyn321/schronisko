import { NewsCreateInput, NewsUpdateInput, NewsModifyParams, NewsListElement } from './News';
import type { News } from '.prisma/client';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import { v4 as uuid } from 'uuid';
import { saveImage, deleteImage } from './img-fs';

function validateNewsUpdate<T>(news: NewsCreateInput,): boolean {
  return !!news.title;
}

function validateNewsCreate<T>(news: NewsCreateInput, imageData: string): boolean {
  return validateNewsUpdate(news) && !!imageData;
}

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) { }

  toListElement(news: News): NewsListElement {
    const { content, ...listElement } = news;
    return listElement;
  }

  async getAll(): Promise<NewsListElement[]> {
    const fields = { title: true, description: true, id: true, isPublished: true, createdAt: true };
    return await this.prisma.news.findMany({ select: fields, orderBy: [{ title: 'asc' }] });
  }

  async get(id: string): Promise<News> {
    const news = await this.prisma.news.findUnique({ where: { id } });
    if (!news) {
      throw new NotFoundException();
    }
    return news;
  }

  async create(params: NewsModifyParams<NewsCreateInput>): Promise<NewsListElement> {
    if (!validateNewsCreate(params.news, params.imageData)) {
      throw new BadRequestException(null, "Brak tytułu lub zdjęcia");
    }

    params.news.imageName = `${uuid()}.png`;
    await saveImage(params.news.imageName, params.imageData, 'News');
    const createdNews = await this.prisma.news.create({ data: params.news });
    return this.toListElement(createdNews);
  }

  async update(id: string, params: NewsModifyParams<NewsUpdateInput>): Promise<NewsListElement> {
    if (!validateNewsUpdate(params.news)) {
      throw new BadRequestException(id, "Brak tytułu.");
    }

    if (params.imageData) {
      await saveImage(params.news.imageName, params.imageData, 'News');
    }

    const updatedNews = await this.prisma.news.update({
      where: { id }, data: params.news
    });
    return this.toListElement(updatedNews);
  }

  async delete(id: string): Promise<News> {
    const post = await this.prisma.news.findUnique({ where: { id } });
    try {
      await deleteImage(post.imageName);
    } catch (e) {
      console.warn(e);
    }
    return await this.prisma.news.delete({
      where: { id }
    });
  }
}
