import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail",
    });
  }

  async send(subject: string, text: string) {
    try {
      this.transporter.sendMail({
        from: "info@schrowysoko.com",
        to: "Wawrzyn321@gmail.com",
        subject,
        text,
      });
      return "OK";
    } catch (e) {
      return new InternalServerErrorException()
    }
  }
}
