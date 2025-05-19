import { BadRequestException, Injectable } from '@nestjs/common';
import { CaptchaServiceInterface, MailServiceInterface } from './interface';
import {
  VAdoptionFormData,
  VAdoptionFormDataSchema,
  VolunteeringFormData,
  VolunteeringFormDataSchema,
} from './validation';

@Injectable()
export class CommunicationService {
  constructor(
    private captchaService: CaptchaServiceInterface,
    private mailService: MailServiceInterface,
  ) {}

  async sendVolunteering(formData: VolunteeringFormData) {
    if (!(await this.captchaService.validateCaptcha(formData.captchaToken))) {
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
      console.warn(e);
      throw new BadRequestException('Nie udało się wysłać maila.');
    }
  }

  async sendVAdoption(formData: VAdoptionFormData) {
    if (!(await this.captchaService.validateCaptcha(formData.captchaToken))) {
      throw new BadRequestException(null, 'Nieprawidłowa captcha');
    }
    const { error } = VAdoptionFormDataSchema.safeParse(formData);
    if (error) {
      throw new BadRequestException(error, 'Nieprawidłowe dane');
    }

    try {
      await this.mailService.send('Ktoś będzie adoptował wirtualnie', 'todo');
    } catch (e) {
      console.warn(e);
      throw new BadRequestException('Nie udało się wysłać maila.');
    }
  }
}
