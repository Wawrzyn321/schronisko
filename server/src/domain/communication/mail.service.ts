import { Injectable } from '@nestjs/common';
import * as postmark from 'postmark';
import { MailServiceInterface } from './MailServiceInterface';

const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN;

@Injectable()
export class MailService implements MailServiceInterface {
  private client: any;
  constructor() {
    this.client = new postmark.ServerClient(POSTMARK_API_TOKEN);
  }

  async send(subject: string, text: string) {
    try {
      const res = await this.client.sendEmail({
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
