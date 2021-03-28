import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  User,
  Prisma
} from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string = ''): Promise<User | undefined> {
    return await this.prisma.user.findUnique({where: { email }});
  }

  async getPriviledges(userId: number = -1) {
    return await this.prisma.userPriviledges.findMany({where: { userId }});
  }
}
