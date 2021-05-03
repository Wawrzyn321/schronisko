import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';

// todo move to shared

export interface NewsListElement {
  id: string;
  title: string;
}

export interface News extends NewsListElement {
  content: string;
  createdAt: Date;
  isPublished: boolean;
}

export interface NewsCreateParams {
  title: string;
  isPublished: boolean;
  content: string;
}

function validateCreate(news: NewsCreateParams) {
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
    const fields = { title: true, id: true, isPublished: true, createdAt: true };
    return await this.prisma.news.findMany({ select: fields, orderBy: [{ title: 'asc' }] });
  }

  async get(id: string): Promise<News> {
    return await this.prisma.news.findUnique({ where: { id } });
  }

  async create(news: NewsCreateParams): Promise<NewsListElement> {
    if (!validateCreate(news)) {
      throw new BadRequestException();
    }
    const createdNews = await this.prisma.news.create({ data: news });
    return this.toListElement(createdNews);
  }

  async update(id: string, news: News): Promise<NewsListElement> {
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
