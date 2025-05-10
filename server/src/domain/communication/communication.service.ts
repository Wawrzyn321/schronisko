import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  VAdoptionFormFetch,
  VolunteeringFormFetch,
  validateVAdoptionFormFetch,
  validateVoluneeringFormFetch,
} from './common';
import { CaptchaServiceInterface, MailServiceInterface } from './interface';

@Injectable()
export class CommunicationService {
  transporter: nodemailer.Transporter;

  constructor(
    private captchaService: CaptchaServiceInterface,
    private mailService: MailServiceInterface,
  ) {
    this.transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail',
    });
  }

  async sendVolunteering(props: VolunteeringFormFetch) {
    if (!this.captchaService.validateCaptcha(props.captchaToken)) {
      throw new BadRequestException(null, 'Nieprawidłowa captcha');
    }

    const validateInput = () => validateVoluneeringFormFetch(props);
    const onValidated = async () =>
      await this.mailService.send(
        'Nowa osoba chce dołączyć do wolontariatu',
        `Tu podaję dane:
        kto: ${props.fullName}
        email: ${props.email}
        telefon: ${props.phoneNumber}
        data urodzenia: ${props.birthDate}
        coś więcej?: ${props.about}
      `,
      );

    await this.send(validateInput, onValidated);
  }

  async sendVAdoption(props: VAdoptionFormFetch) {
    if (!this.captchaService.validateCaptcha(props.captchaToken)) {
      throw new BadRequestException(null, 'Nieprawidłowa captcha');
    }

    const validateInput = () => validateVAdoptionFormFetch(props);
    const onValidated = async () =>
      await this.mailService.send('Ktoś będzie adoptował wirtualnie', 'todo');

    await this.send(validateInput, onValidated);
  }

  async send(validateInput: () => boolean, sendEmail: () => Promise<void>) {
    if (!validateInput()) {
      throw new BadRequestException('Brak wszystkich danych.');
    }

    try {
      await sendEmail();
    } catch (e) {
      throw new BadRequestException('Nie udało się wysłać maila.');
    }
  }
}
