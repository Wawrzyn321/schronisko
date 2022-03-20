import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma-connect/prisma.service';
import { CommunicationController } from '../communication.controller';
import { CommunicationService } from '../communication.service';
import { CaptchaService } from '../captcha.service';
import { MailService } from '../mail.service';
import { VAdoptionFormFetch, VolunteeringFormFetch } from '../common';

const mockVolunteeringRequest: VolunteeringFormFetch = {
  about: 'about',
  fullName: 'fn',
  email: 'email',
  telNumber: '123',
  birthDate: 'now',
};

const mockVAdoptionRequest: VAdoptionFormFetch = {
  fullName: 'fn',
  vCaretakerName: 'vn',
  email: 'email',
  additionalMessage: '',
  animalId: 'id',
  animalName: 'name',
  animalRefNo: 'ref',
};

describe('CommunicationController', () => {
  let communicationController: CommunicationController;
  let communicationService: CommunicationService;
  let prismaServiceMock: PrismaService;
  let captchaService: CaptchaService;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    captchaService = new CaptchaService(prismaServiceMock);
    mailService = new MailService();
    communicationService = new CommunicationService(
      captchaService,
      mailService,
    );
    communicationController = new CommunicationController(communicationService);
  });

  it('POST captcha returns captcha', async () => {
    const createMock = jest.fn().mockReturnValue({ id: 'c-id' });

    prismaServiceMock.captcha.create = createMock;

    const result = await communicationController.getCapcha();

    expect(result.id).toBe('c-id');
    expect(result.uri).toMatch(new RegExp('^data:image/png;base64'));
    expect(createMock).toHaveBeenCalled();
  });

  it('POST volunteer validates input and sends mail', async () => {
    const sendMailMock = jest.fn();
    const validateCaptchaMock = jest.fn().mockReturnValue(true);

    mailService.send = sendMailMock;
    captchaService.validateCaptcha = validateCaptchaMock;

    await communicationController.sendVolunteering(
      'captcha-id',
      'captcha-text',
      mockVolunteeringRequest,
    );

    expect(sendMailMock.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "Nowa osoba chce dołączyć do wolontariatu",
          "Tu podaję dane:
              kto: fn
              email: email
              telefon: 123
              data urodzenia: now
              coś więcej?: about
            ",
        ],
      ]
    `);
    expect(captchaService.validateCaptcha).toHaveBeenCalledWith(
      'captcha-id',
      'captcha-text',
    );
  });

  it('POST volunteer with invalid captcha returns error', async () => {
    const sendMailMock = jest.fn();
    const validateCaptchaMock = jest.fn().mockReturnValue(false);

    mailService.send = sendMailMock;
    captchaService.validateCaptcha = validateCaptchaMock;

    await expect(
      communicationController.sendVolunteering(
        'captcha-id',
        'captcha-text',
        mockVolunteeringRequest,
      ),
    ).rejects.toThrow(/captcha/);
  });

  it('POST volunteer with invalid data returns error', async () => {
    const mockVolunteeringRequest: VolunteeringFormFetch = {
      about: '',
      fullName: 'fn',
      email: 'email',
      telNumber: '123',
      birthDate: 'now',
    };

    const sendMailMock = jest.fn();

    mailService.send = sendMailMock;

    await expect(
      communicationController.sendVolunteering(
        'captcha-id',
        'captcha-text',
        mockVolunteeringRequest,
      ),
    ).rejects.toThrow(/Brak wszystkich danych/);
  });

  it('POST v-adoption validates input and sends mail', async () => {
    const sendMailMock = jest.fn();
    const validateCaptchaMock = jest.fn().mockReturnValue(true);

    mailService.send = sendMailMock;
    captchaService.validateCaptcha = validateCaptchaMock;

    await communicationController.sendVAdoption(
      'captcha-id',
      'captcha-text',
      mockVAdoptionRequest,
    );

    expect(sendMailMock.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "Ktoś będzie adoptował wirtualnie",
          "todo",
        ],
      ]
    `);
    expect(captchaService.validateCaptcha).toHaveBeenCalledWith(
      'captcha-id',
      'captcha-text',
    );
  });

  it('POST v-adoption with invalid captcha returns error', async () => {
    const sendMailMock = jest.fn();
    const validateCaptchaMock = jest.fn().mockReturnValue(false);

    mailService.send = sendMailMock;
    captchaService.validateCaptcha = validateCaptchaMock;

    await expect(
      communicationController.sendVAdoption(
        'captcha-id',
        'captcha-text',
        mockVAdoptionRequest,
      ),
    ).rejects.toThrow(/captcha/);
  });

  it('POST v-adoption with invalid data returns error', async () => {
    const mockVAdoptionRequest: VAdoptionFormFetch = {
      fullName: '',
      vCaretakerName: 'vn',
      email: 'email',
      additionalMessage: '',
      animalId: 'id',
      animalName: 'name',
      animalRefNo: 'ref',
    };

    const sendMailMock = jest.fn();

    mailService.send = sendMailMock;

    await expect(
      communicationController.sendVAdoption(
        'captcha-id',
        'captcha-text',
        mockVAdoptionRequest,
      ),
    ).rejects.toThrow(/Brak wszystkich danych/);
  });
});
