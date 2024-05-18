import { Permission, Settings } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma-connect/prisma.service';
import { LoggedInUser } from '../auth/types';
import { LogsService } from '../logs/logs.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class SettingsService {
  constructor(
    private prisma: PrismaService,
    private logsService: LogsService,
    private cacheService: CacheService,
  ) {}

  async getAll(): Promise<Settings[]> {
    return await this.prisma.settings.findMany();
  }

  async upsert(
    user: LoggedInUser,
    id: string,
    value: string,
  ): Promise<Settings> {
    const prevSetting = await this.prisma.settings.findFirst({ where: { id } });
    if (prevSetting) {
      return this.update(user, id, value, prevSetting);
    } else {
      return this.create(user, id, value);
    }
  }

  async update(
    user: LoggedInUser,
    id: string,
    value: string,
    prevSetting: Settings,
  ) {
    const updatedSetting = await this.prisma.settings.update({
      where: { id },
      data: { id, value },
    });
    await this.logsService.log({
      message: `zmienił ustawienie ${id} (${prevSetting.value} -> ${value})`,
      permission: Permission.USER,
      user,
    });
    await this.cacheService.onSettingsChange();
    return updatedSetting;
  }

  async create(user: LoggedInUser, id: string, value: string) {
    const createdSetting = await this.prisma.settings.create({
      data: { id, value },
    });
    await this.logsService.log({
      message: `dodał ustawienie ${id} o wartości ${value}`,
      permission: Permission.USER,
      user,
    });
    await this.cacheService.onSettingsChange();
    return createdSetting;
  }
}
