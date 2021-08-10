import { Permission } from '@prisma/client';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';
import type { Page } from '.prisma/client';
import { PageListElement } from './Page';
import { LoggedInUser } from '../auth/types';
import { LogsService } from './../logs/logs.service';
import { formattedDiff } from '../logs/diff';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService, private logsService: LogsService) { }

  async getAll(takeTop?: number): Promise<PageListElement[]> {
    return await this.prisma.page.findMany({ select: { title: true, id: true }, take: takeTop, orderBy: [{ title: 'asc' }] });
  }

  async get(id: string): Promise<Page> {
    const page = await this.prisma.page.findUnique({ where: { id } });
    if (!page) {
      throw new NotFoundException();
    }
    return page;
  }

  async update(user: LoggedInUser, id: string, page: Page): Promise<Page> {
    const prevPage = await this.get(id);
    if (prevPage.id !== id) {
      throw new BadRequestException(id, "id musi się zgadzać");
    }

    const updatedPage = await this.prisma.page.update({
      where: { id }, data: page
    });
    const diff = formattedDiff(prevPage, updatedPage, [{ name: 'Treść', selector: (p: Page) => p.content, omitValues: true }, { name: 'Tytuł', selector: (p: Page) => p.title }]);
    await this.logsService.log({
      message: `zaktualizował stronę ${page.title} (id: ${id}) ${diff}`,
      permission: Permission.PAGE,
      user,
    })
    return updatedPage;
  }
}
