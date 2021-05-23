// import { NewsListElement, NewsCreateParams } from './../../prisma-types/News';
import type { News } from '.prisma/client';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import { v4 as uuid } from 'uuid';
import { saveFile } from './saveFile';

export interface NewsCreateParams {
  title: string;
  description: string;
  isPublished: boolean;
  content: string;
  imageData: string;
}

export interface NewsListElement {
  id: string;
  description: string;
  title: string;
  createdAt: Date;
  isPublished: boolean;
}


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

  async create(params: NewsCreateParams): Promise<NewsListElement> {
    if (!validateNews(params)) {
      throw new BadRequestException();
    }

    const {imageData, ...news}: { imageData: string } & any = params;

    news.imageName = `${uuid()}.png`;
    await saveFile(news.imageName, imageData);
    const createdNews = await this.prisma.news.create({ data: news });
    return this.toListElement(createdNews);
  }

  async update(id: string, news: News): Promise<NewsListElement> {
    if (!validateNews(news)) {
      throw new BadRequestException();
    }
    const updatedNews = await this.prisma.news.update({
      where: { id }, data: news
    });
    return this.toListElement(updatedNews);
  }

  async delete(id: string): Promise<News> {
    return await this.prisma.news.delete({
      where: { id }
    });
  }
}
