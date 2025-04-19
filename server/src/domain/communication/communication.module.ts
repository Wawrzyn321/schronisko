import { PrismaService } from '../../prisma-connect/prisma.service';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { CaptchaService } from './captcha.service';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { MailServiceInterface } from './MailServiceInterface';

@Module({
  providers: [
    CommunicationService,
    PrismaService,
    {
      provide: MailServiceInterface,
      useClass: MailService,
    },
    CaptchaService,
  ],
  exports: [CommunicationService],
  controllers: [CommunicationController],
})
export class CommunicationModule {}
