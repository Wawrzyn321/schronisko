import { Permission } from '@prisma-app/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import type { Page } from '@prisma-app/client';
import { PageListElement } from './Page';
import { LoggedInUser } from '../auth/types';
import { LogsService } from '../logs/logs.service';
import { formattedDiff } from '../logs/diff';
import {
  deleteImagesInContent,
  ImageData,
  saveImagesFromContentModyfyingIt,
} from '../../util/img-fs';
import { SettingsService } from '../settings/settings.service';
import { containsSubsitution, substitute } from '../../util/substitutions';
import { SanitizeService } from '../support/sanitize.service';
import { CacheServiceInterface } from '../../domain/cache/interface';

@Injectable()
export class PagesService {
  constructor(
    private prisma: PrismaService,
    private settingsService: SettingsService,
    private logsService: LogsService,
    private cacheService: CacheServiceInterface,
    private sanitizeService: SanitizeService,
  ) {}

  async getAll(takeTop?: number): Promise<PageListElement[]> {
    return await this.prisma.page.findMany({
      select: { title: true, id: true },
      take: takeTop,
      orderBy: [{ title: 'asc' }],
    });
  }

  async getDogsPage(): Promise<Page> {
    const settings = await this.settingsService.getAll();
    const dogVolunteeringEnabledSetting = settings.find(
      (s) => s.id === 'DOG_VOLUNTEERING_ENABLED',
    );
    const areDogVolunteeringEnabled =
      dogVolunteeringEnabledSetting?.value === 'true';
    return this.get(
      areDogVolunteeringEnabled
        ? 'wolontariat-pies-on'
        : 'wolontariat-pies-off',
      true,
    );
  }

  async getIds(): Promise<string[]> {
    return (await this.prisma.page.findMany()).map((p) => p.id);
  }

  async get(id: string, useSubstitution: boolean): Promise<Page> {
    const cache = await this.cacheService.useArticleCache(
      'page',
      id,
      useSubstitution,
    );

    if (cache && cache.value) {
      return JSON.parse(cache.value);
    }

    const page = await this.prisma.page.findUnique({ where: { id } });
    if (!page) {
      throw new NotFoundException();
    }

    if (useSubstitution && containsSubsitution(page.content)) {
      const settings = await this.settingsService.getAll();
      page.content = substitute(page.content, settings);
    }

    if (cache) {
      cache.set(JSON.stringify(page));
    }

    return page;
  }

  async update(
    user: LoggedInUser,
    id: string,
    page: Page,
    images: ImageData[],
  ): Promise<Page> {
    const cache = await this.cacheService.useArticleCache('page', id);
    const prevPage = await this.get(id, false);
    if (prevPage.id !== id) {
      throw new BadRequestException(id, 'id musi się zgadzać');
    }

    await deleteImagesInContent(prevPage.content, page.content);

    page.content = await saveImagesFromContentModyfyingIt(
      page.content,
      images,
      'pages',
    );
    page.content = this.sanitizeService.sanitizeHtml(page.content);

    const updatedPage = await this.prisma.page.update({
      where: { id },
      data: page,
    });
    const diff = formattedDiff(prevPage, updatedPage, [
      { name: 'Treść', selector: (p: Page) => p.content, omitValues: true },
      { name: 'Tytuł', selector: (p: Page) => p.title },
    ]);
    await this.logsService.log({
      message: `zaktualizował stronę ${page.title} (id: ${id}) ${diff}`,
      permission: Permission.PAGE,
      user,
    });

    await cache.clear();

    return updatedPage;
  }
}
