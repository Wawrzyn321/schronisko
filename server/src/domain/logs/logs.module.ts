import { PrismaModule } from '../prisma/prisma.module';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [LogsService],
  exports: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
