import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CaptchaService } from './captcha.service';
import {
  VAdoptionFormFetch,
  VolunteeringFormFetch,
  validateVAdoptionFormFetch,
  validateVoluneeringFormFetch,
} from './common';
import { MailService } from './mail.service';

@Injectable()
export class CommunicationService {
  transporter: nodemailer.Transporter;

  constructor(
    private captchaService: CaptchaService,
    private mailService: MailService,
  ) {
    this.transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail',
    });
  }

  async generateCaptcha() {
    return await this.captchaService.generateCaptcha();
  }

  async sendVolunteering(
    id: string,
    text: string,
    props: VolunteeringFormFetch,
  ) {
    const validateInput = () => validateVoluneeringFormFetch(props);
    const onValidated = async () =>
      await this.mailService.send(
        'Nowa osoba chce dołączyć do wolontariatu',
        `Tu podaję dane:
        kto: ${props.fullName}
        email: ${props.email}
        telefon: ${props.telNumber}
        data urodzenia: ${props.birthDate}
        coś więcej?: ${props.about}
      `,
      );

    await this.send(id, text, validateInput, onValidated);
  }

  async sendVAdoption(id: string, text: string, props: VAdoptionFormFetch) {
    const validateInput = () => validateVAdoptionFormFetch(props);
    const onValidated = async () =>
      await this.mailService.send('Ktoś będzie adoptował wirtualnie', 'todo');

    await this.send(id, text, validateInput, onValidated);
  }

  async send(
    id: string,
    text: string,
    validateInput: () => boolean,
    sendEmail: () => Promise<void>,
  ) {
    if (!validateInput()) {
      throw new BadRequestException('Brak wszystkich danych.');
    }

    if (await this.captchaService.validateCaptcha(id, text)) {
      try {
        await sendEmail();
      } catch (e) {
        throw new BadRequestException('Nie udało się wysłać maila.');
        throw e;
      }
    } else {
      throw new BadRequestException('Brzydka captcha');
    }
  }
}
