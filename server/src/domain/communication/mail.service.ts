import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sendGridClient from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sendGridClient.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(subject: string, text: string) {
    const msg = {
      to: 'Wawrzyn321@gmail.com',
      from: 'Wawrzyn321@oto-jest-wawrzyn.pl',
      subject,
      text,
    };
    try {
      const [_] = await sendGridClient.send(msg);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
