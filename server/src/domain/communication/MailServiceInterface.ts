export abstract class MailServiceInterface {
  abstract send(subject: string, text: string): Promise<void>;
}
export abstract class CaptchaServiceInterface {
  abstract validateCaptcha(captchaToken: string): Promise<boolean>;
}
