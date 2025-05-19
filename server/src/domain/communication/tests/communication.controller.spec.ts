import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { CommunicationController } from '../communication.controller';
import { CommunicationService } from '../communication.service';
import { CaptchaServiceInterface, MailServiceInterface } from '../interface';
import { AnimalType } from '@prisma-app/client';
import { VAdoptionFormData, VolunteeringFormData } from '../validation';

const mockVolunteeringRequest: VolunteeringFormData = {
  about: 'about',
  fullName: 'fn',
  email: 'email@email.com',
  phoneNumber: '123 456 789',
  birthDate: 'now',
  captchaToken: 'test-token',
  animalType: AnimalType.CAT,
};

const mockVAdoptionRequest: VAdoptionFormData = {
  fullName: 'fullname',
  vCaretakerName: 'vn',
  email: 'email@email.com',
  additionalMessage: '',
  animalId: 'id',
  animalName: 'name',
  animalRefNo: 'ref',
  captchaToken: 'test-token',
};

class MockMailService implements MailServiceInterface {
  async send(subject: string, text: string) {}
}

class MockCaptchaService implements CaptchaServiceInterface {
  async validateCaptcha(captchaToken: string) {
    return Promise.resolve(true);
  }
}

describe('CommunicationController', () => {
  let communicationController: CommunicationController;
  let communicationService: CommunicationService;
  let prismaServiceMock: PrismaService;
  let captchaService: CaptchaServiceInterface;
  let mailService: MockMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    captchaService = new MockCaptchaService();
    mailService = new MockMailService();
    communicationService = new CommunicationService(
      captchaService,
      mailService,
    );
    communicationController = new CommunicationController(communicationService);
  });

  it('POST volunteer validates input and sends mail', async () => {
    const sendMailMock = jest.fn();
    const validateCaptchaMock = jest.fn().mockReturnValue(true);

    mailService.send = sendMailMock;
    captchaService.validateCaptcha = validateCaptchaMock;

    await communicationController.sendVolunteering(mockVolunteeringRequest);

    expect(sendMailMock.mock.calls).toMatchInlineSnapshot(`
[
  [
    "Nowa osoba chce dołączyć do wolontariatu",
    "Tu podaję dane:
        kto: fn
        email: email@email.com
        telefon: 123 456 789
        data urodzenia: now
        coś więcej?: about
        type: CAT
      ",
  ],
]
`);
    expect(captchaService.validateCaptcha).toHaveBeenCalledWith('test-token');
  });

  it('POST volunteer with invalid captcha returns error', async () => {
    const sendMailMock = jest.fn();
    const validateCaptchaMock = jest.fn().mockReturnValue(false);

    mailService.send = sendMailMock;
    captchaService.validateCaptcha = validateCaptchaMock;

    await expect(
      communicationController.sendVolunteering(mockVolunteeringRequest),
    ).rejects.toThrow(/captcha/);
  });

  it('POST volunteer with invalid data returns error', async () => {
    const mockVolunteeringRequest: VolunteeringFormData = {
      about: '',
      fullName: 'fn',
      email: 'email@email.com',
      phoneNumber: '123',
      birthDate: 'now',
      captchaToken: 'test-token',
      animalType: AnimalType.CAT,
    };

    const sendMailMock = jest.fn();

    mailService.send = sendMailMock;

    await expect(
      communicationController.sendVolunteering(mockVolunteeringRequest),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
"[
  {
    "code": "too_small",
    "minimum": 9,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "String must contain at least 9 character(s)",
    "path": [
      "phoneNumber"
    ]
  }
]"
`);
  });

  it('POST v-adoption validates input and sends mail', async () => {
    const sendMailMock = jest.fn();
    const validateCaptchaMock = jest.fn().mockReturnValue(true);

    mailService.send = sendMailMock;
    captchaService.validateCaptcha = validateCaptchaMock;

    await communicationController.sendVAdoption(mockVAdoptionRequest);

    expect(sendMailMock.mock.calls).toMatchInlineSnapshot(`
[
  [
    "Ktoś będzie adoptował wirtualnie",
    "todo",
  ],
]
`);
    expect(captchaService.validateCaptcha).toHaveBeenCalledWith('test-token');
  });

  it('POST v-adoption with invalid captcha returns error', async () => {
    const sendMailMock = jest.fn();
    const validateCaptchaMock = jest.fn().mockReturnValue(false);

    mailService.send = sendMailMock;
    captchaService.validateCaptcha = validateCaptchaMock;

    await expect(
      communicationController.sendVAdoption(mockVAdoptionRequest),
    ).rejects.toThrow(/captcha/);
  });

  it('POST v-adoption with invalid data returns error', async () => {
    const mockVAdoptionRequest: VAdoptionFormData = {
      fullName: 'full name',
      vCaretakerName: 'vn',
      email: '',
      additionalMessage: '',
      animalId: 'id',
      animalName: 'name',
      animalRefNo: 'ref',
      captchaToken: 'test-token',
    };

    const sendMailMock = jest.fn();

    mailService.send = sendMailMock;

    await expect(communicationController.sendVAdoption(mockVAdoptionRequest))
      .rejects.toThrowErrorMatchingInlineSnapshot(`
"[
  {
    "validation": "email",
    "code": "invalid_string",
    "message": "Invalid email",
    "path": [
      "email"
    ]
  }
]"
`);
  });
});
