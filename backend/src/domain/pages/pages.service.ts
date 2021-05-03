import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';

// todo move to shared
export interface PageListElement {
  id: string;
  title: string;
}

export interface Page extends PageListElement {
  content: string;
}

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) { }

  async getAll(): Promise<PageListElement[]> {
    return await this.prisma.page.findMany({ select: { title: true, id: true }, orderBy: [{ title: 'asc' }] });
  }

  async get(id: string): Promise<Page> {
    return await this.prisma.page.findUnique({where: { id }});
  }

  async update(id: string, post: Page): Promise<Page> {
   return await this.prisma.page.update({
     where: { id }, data: post
    });
  }
}
