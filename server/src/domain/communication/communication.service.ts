import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CaptchaServiceInterface, MailServiceInterface } from './interface';
import {
  VAdoptionFormData,
  VAdoptionFormDataSchema,
  VolunteeringFormData,
  VolunteeringFormDataSchema,
} from './validation';

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

  async sendVolunteering(formData: VolunteeringFormData) {
    if (!this.captchaService.validateCaptcha(formData.captchaToken)) {
      throw new BadRequestException(null, 'Nieprawidłowa captcha');
    }
    const { error } = VolunteeringFormDataSchema.safeParse(formData);
    if (error) {
      throw new BadRequestException(error, 'Nieprawidłowe dane');
    }

    try {
      await this.mailService.send(
        'Nowa osoba chce dołączyć do wolontariatu',
        `Tu podaję dane:
        kto: ${formData.fullName}
        email: ${formData.email}
        telefon: ${formData.phoneNumber}
        data urodzenia: ${formData.birthDate}
        coś więcej?: ${formData.about}
        type: ${formData.animalType}
      `,
      );
    } catch (e) {
      throw new BadRequestException('Nie udało się wysłać maila.');
    }
  }

  async sendVAdoption(formData: VAdoptionFormData) {
    if (!this.captchaService.validateCaptcha(formData.captchaToken)) {
      throw new BadRequestException(null, 'Nieprawidłowa captcha');
    }
    const { error } = VAdoptionFormDataSchema.safeParse(formData);
    if (error) {
      throw new BadRequestException(error, 'Nieprawidłowe dane');
    }

    try {
      await this.mailService.send('Ktoś będzie adoptował wirtualnie', 'todo');
    } catch (e) {
      throw new BadRequestException('Nie udało się wysłać maila.');
    }
  }
}
