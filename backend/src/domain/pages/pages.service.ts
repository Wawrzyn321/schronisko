import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import type { Page } from '.prisma/client';
import { PageListElement } from 'src/prisma-types/Page';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) { }

  async getAll(): Promise<PageListElement[]> {
    return await this.prisma.page.findMany({ select: { title: true, id: true }, orderBy: [{ title: 'asc' }] });
  }

  async get(id: string): Promise<Page> {
    const page = await this.prisma.page.findUnique({where: { id }});
    if (!page) {
      throw new NotFoundException();
    }
    return page;
  }

  async update(id: string, post: Page): Promise<Page> {
   return await this.prisma.page.update({
     where: { id }, data: post
    });
  }
}
