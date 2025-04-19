export abstract class MailServiceInterface {
  abstract send(subject: string, text: string): Promise<void>;
}
