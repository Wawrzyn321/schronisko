import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';

@Injectable()
export class ConstPostsService {
  constructor(private prisma: PrismaService) { }

  async getAll(): Promise<any[]> {
    const options = { select: { name: true, id: true } };
    return await this.prisma.constPost.findMany(options);
  }

  async get(id: string): Promise<any> {
    return await this.prisma.constPost.findUnique({where: { id }});
  }

  async update(id: string, post: any): Promise<any> {
   return await this.prisma.constPost.update({
     where: { id }, data: post
    });
  }
}
