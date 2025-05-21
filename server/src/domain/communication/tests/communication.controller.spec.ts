import { CommunicationController } from '../communication.controller';
import { CommunicationService } from '../communication.service';
import { CaptchaServiceInterface } from '../interface';
import {
  MockCaptchaService,
  MockMailService,
  mockVAdoptionRequest,
  mockVolunteeringRequest,
} from './testData';

describe('CommunicationController', () => {
  let communicationController: CommunicationController;
  let communicationService: CommunicationService;
  let captchaService: CaptchaServiceInterface;
  let mailService: MockMailService;

  beforeEach(async () => {
    captchaService = new MockCaptchaService();
    mailService = new MockMailService();
    communicationService = new CommunicationService(
      captchaService,
      mailService,
    );
    communicationController = new CommunicationController(communicationService);
  });

  describe('POST volunteer', () => {
    it('validates input and sends mail', async () => {
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

    it('with invalid captcha returns error', async () => {
      const validateCaptchaMock = jest.fn().mockReturnValue(false);

      captchaService.validateCaptcha = validateCaptchaMock;

      await expect(
        communicationController.sendVolunteering(mockVolunteeringRequest),
      ).rejects.toThrow(/captcha/);
    });

    it('with invalid data returns error', async () => {
      const invalidRequest = { ...mockVolunteeringRequest, phoneNumber: '' };

      await expect(communicationController.sendVolunteering(invalidRequest))
        .rejects.toThrowErrorMatchingInlineSnapshot(`
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
  });

  describe('POST v-adoption', () => {
    it('validates input and sends mail', async () => {
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

    it('with invalid captcha returns error', async () => {
      const validateCaptchaMock = jest.fn().mockReturnValue(false);

      captchaService.validateCaptcha = validateCaptchaMock;

      await expect(
        communicationController.sendVAdoption(mockVAdoptionRequest),
      ).rejects.toThrow(/captcha/);
    });

    it('with invalid data returns error', async () => {
      const invalidRequest = { ...mockVAdoptionRequest, email: '' };

      await expect(communicationController.sendVAdoption(invalidRequest))
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
});
