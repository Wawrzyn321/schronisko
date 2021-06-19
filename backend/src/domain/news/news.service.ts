import { NewsCreateInput, NewsUpdateInput, NewsModifyParams, NewsListElement } from './News';
import type { News } from '.prisma/client';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import { v4 as uuid } from 'uuid';
import { saveImage, deleteImage } from './img-fs';


function validateNews<T>(news: NewsCreateInput): boolean {
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
    await saveImage(params.news.imageName, params.imageData);
    const createdNews = await this.prisma.news.create({ data: params.news });
    return this.toListElement(createdNews);
  }

  async update(id: string, params: NewsModifyParams<NewsUpdateInput>): Promise<NewsListElement> {
    if (!validateNews(params.news)) {
      throw new BadRequestException();
    }

    if (params.imageData) {
      await saveImage(params.news.imageName, params.imageData);
    }

    const updatedNews = await this.prisma.news.update({
      where: { id }, data: params.news
    });
    return this.toListElement(updatedNews);
  }

  async delete(id: string): Promise<News> {
    const post = await this.prisma.news.findUnique({ where: { id } });
    await deleteImage(post.imageName);
    return await this.prisma.news.delete({
      where: { id }
    });
  }
}
