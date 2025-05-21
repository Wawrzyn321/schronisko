import { Injectable } from '@nestjs/common';
import { CaptchaServiceInterface } from './interface';
import { ConfigService } from '@nestjs/config';
import { CONFIG, ENV_DISABLED } from '../../config/configuration';

const CAPTCHA_VALIDATE_URL = 'https://www.google.com/recaptcha/api/siteverify';

type CaptchaResponse = {
  success: boolean;
};

@Injectable()
export class CaptchaService implements CaptchaServiceInterface {
  private captchaKey: string;

  constructor(configService: ConfigService) {
    this.captchaKey = configService.getOrThrow<string>(CONFIG.captchaKey);
  }

  async validateCaptcha(captchaToken: string) {
    if (this.captchaKey == ENV_DISABLED) {
      return true;
    }

    try {
      const response = await fetch(CAPTCHA_VALIDATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: this.captchaKey,
          response: captchaToken,
        }),
      });

      const data = (await response.json()) as CaptchaResponse;
      return data.success;
    } catch (error) {
      console.error('Captcha error:', error);
      return false;
    }
  }
}
