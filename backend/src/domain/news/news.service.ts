import { NewsCreateInput, NewsUpdateInput, NewsModifyParams, NewsListElement } from '../../../../prisma/prisma-types/News';
import type { News } from '.prisma/client';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import { v4 as uuid } from 'uuid';
import { saveFile } from './saveFile';


function validateNews(news: any) {
  return !!news.title;
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
    if (!validateNews(params.news)) {
      throw new BadRequestException();
    }

    params.news.imageName = `${uuid()}.png`;
    await saveFile(params.news.imageName, params.imageData);
    const createdNews = await this.prisma.news.create({ data: params.news });
    return this.toListElement(createdNews);
  }

  async update(id: string, params: NewsModifyParams<NewsUpdateInput>): Promise<NewsListElement> {
    if (!validateNews(params.news)) {
      throw new BadRequestException();
    }

    if (params.imageData) {
      await saveFile(params.news.imageName, params.imageData);
    }

    const updatedNews = await this.prisma.news.update({
      where: { id }, data: params.news
    });
    return this.toListElement(updatedNews);
  }

  async delete(id: string): Promise<News> {
    return await this.prisma.news.delete({
      where: { id }
    });
  }
}
