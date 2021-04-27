import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }

  // async findOne(email: string = ''): Promise<User | undefined> {
  //   return await this.prisma.user.findUnique({ where: { email } });
  // }

  // async getAll(): Promise<any[]> {
  //   return await this.prisma.poss.findMany({ orderBy: [{ name: 'asc'}]});
  // }
}
