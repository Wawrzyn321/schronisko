import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { CaptchaService } from './captcha.service';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { CaptchaServiceInterface, MailServiceInterface } from './interface';

@Module({
  providers: [
    PrismaService,
    {
      provide: MailServiceInterface,
      useClass: MailService,
    },
    {
      provide: CaptchaServiceInterface,
      useClass: CaptchaService,
    },
  ],
  exports: [],
  controllers: [CommunicationController],
})
export class CommunicationModule {}
