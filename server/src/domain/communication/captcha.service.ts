import { Injectable } from '@nestjs/common';
import { CaptchaServiceInterface } from './MailServiceInterface';

const CAPTCHA_VALIDATE_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

type CaptchaResponse = {
  success: boolean;
};

@Injectable()
export class CaptchaService implements CaptchaServiceInterface {
  async validateCaptcha(captchaToken: string) {
    try {
      const response = await fetch(CAPTCHA_VALIDATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        }),
      });

      const data = (await response.json()) as CaptchaResponse;
      console.log(data);
      return data.success;
    } catch (error) {
      console.error('Captcha error:', error);
      return false;
    }
  }
}
