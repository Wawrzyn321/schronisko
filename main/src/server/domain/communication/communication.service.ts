import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { CaptchaService } from './captcha.service';
import { VAdoptionFormFetch, VolunteeringFormFetch, validateVAdoptionFormFetch, validateVoluneeringFormFetch } from './common';
import { MailService } from './mail.service';

@Injectable()
export class CommunicationService {
    transporter: nodemailer.Transporter;

    constructor(private captchaService: CaptchaService, private mailService: MailService) {
        this.transporter = nodemailer.createTransport({
            sendmail: true,
            newline: "unix",
            path: "/usr/sbin/sendmail",
        });
    }

    async generateCaptcha() {
        return await this.captchaService.generateCaptcha();
    }

    async sendVolunteering(id: string, text: string, props: VolunteeringFormFetch) {
        if (!validateVoluneeringFormFetch(props)) {
            return new BadRequestException("Brak wszystkich danych.")
        }

        if (await this.captchaService.validateCaptcha(id, text)) {
            this.mailService.send(
                "Nowa osoba chce dołączyć do wolontariatu",
                `Tu podaję dane:
            kto: ${props.fullName}
            email: ${props.email}
            telefon: ${props.telNumber}
            data urodzenia: ${props.birthDate}
            coś więcej?: ${props.about}
          `,
            );
        } else {
            return new BadRequestException("Brzydka captcha")
        }
    }
    async sendVAdoption(id: string, text: string, props: VAdoptionFormFetch) {
        if (!validateVAdoptionFormFetch(props)) {
            return new BadRequestException("Brak wszystkich danych.")
        }

        if (await this.captchaService.validateCaptcha(id, text)) {
            this.mailService.send("Ktoś będzie adoptował wirtualnie", 'todo');
        } else {
            return new BadRequestException("Brzydka captcha")
        }
    }
}
