import { LoggedInUser } from '../auth/types';
import { Injectable } from '@nestjs/common';
import { Logs, Permission } from '@prisma-app/client';
import { PrismaService } from '../prisma/prisma.service';

type LogData = {
  user: LoggedInUser;
  permission: Permission;
  message: string;
};

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async get(takeTop?: number): Promise<Logs[]> {
    return await this.prisma.logs.findMany({
      take: takeTop,
      orderBy: [{ time: 'desc' }],
    });
  }

  async delete(user: LoggedInUser): Promise<void> {
    await this.prisma.logs.deleteMany();
    await this.log({
      user,
      permission: Permission.USER,
      message: 'usunął logi.',
    });
  }

  async log({ user, permission, message }: LogData) {
    return await this.prisma.logs.create({
      data: {
        userId: user.id,
        login: user.login,
        permission,
        message: user.login + ' ' + message,
        time: new Date(),
      },
    });
  }
}
