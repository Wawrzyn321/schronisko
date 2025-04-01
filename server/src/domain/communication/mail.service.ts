import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as postmark from 'postmark';

@Injectable()
export class MailService {
  private client: any;
  constructor() {
    this.client = new postmark.ServerClient('1db77c19-d3e1-4669-bbf1-b08110a77ba9');
  }

  async send(subject: string, text: string) {
    const msg = {
      to: 'Wawrzyn321@gmail.com',
      from: 'Wawrzyn321@oto-jest-wawrzyn.pl',
      subject,
      text,
    };
    try {
      const res = await this.client.sendEmail({
        "From": "wawrzyn+schronisko@pwawrzynczyk.pl",
        "To": "wawrzyn@pwawrzynczyk.pl",
        "Subject": "Hello from Postmark",
        "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
        "TextBody": "Hello from Postmark!",
        "MessageStream": "outbound"
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