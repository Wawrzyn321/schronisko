import { AnimalType } from '@prisma-app/client';
import { VAdoptionFormData, VolunteeringFormData } from '../validation';
import { CaptchaServiceInterface, MailServiceInterface } from '../interface';

export const mockVolunteeringRequest: VolunteeringFormData = {
  about: 'about',
  fullName: 'fn',
  email: 'email@email.com',
  phoneNumber: '123 456 789',
  birthDate: 'now',
  captchaToken: 'test-token',
  animalType: AnimalType.CAT,
};

export const mockVAdoptionRequest: VAdoptionFormData = {
  fullName: 'fullname',
  vCaretakerName: 'vn',
  email: 'email@email.com',
  additionalMessage: '',
  animalId: 'id',
  animalName: 'name',
  animalRefNo: 'ref',
  captchaToken: 'test-token',
};

export class MockMailService implements MailServiceInterface {
  async send() {}
}

export class MockCaptchaService implements CaptchaServiceInterface {
  async validateCaptcha() {
    return Promise.resolve(true);
  }
}
