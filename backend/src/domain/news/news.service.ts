import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-connect/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) { }

}
