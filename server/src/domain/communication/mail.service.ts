import { Injectable } from '@nestjs/common';
import { MailServiceInterface } from './interface';
import { ServerClient } from 'postmark';
import { CONFIG, ENV_DISABLED } from '../../config/configuration';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService implements MailServiceInterface {
  private client: ServerClient | null = null;

  constructor(configService: ConfigService) {
    const postmarkApiToken = configService.getOrThrow<string>(CONFIG.postmarkApiToken);
    if (postmarkApiToken !== ENV_DISABLED) {
      this.client = new ServerClient(postmarkApiToken);
    }
  }

  async send(subject: string, text: string) {
    try {
      const res = await this.client!.sendEmail({
        From: 'wawrzyn+schronisko@pwawrzynczyk.pl',
        To: 'wawrzyn@pwawrzynczyk.pl',
        Subject: subject,
        HtmlBody: '<strong>Hello</strong> dear Postmark user.',
        TextBody: 'Hello from Postmark!',
        MessageStream: 'outbound',
      });
      console.log('res', res);
    } catch (e) {
      console.log('Error while sending mail', getMailError(e));
      throw e;
    }
  }
}

function getMailError(e: any) {
  try {
    return e.response.body.errors[0].message;
  } catch {
    return 'Unknown';
  }
}
