import { Injectable } from '@nestjs/common';
import * as captchagen from 'captchagen';
import { PrismaService } from '../../prisma-connect/prisma.service';

@Injectable()
export class CaptchaService {
    captcha: any;

    constructor(private prisma: PrismaService) {
        this.captcha = captchagen.create({ height: 60, width: 180 });
    }

    async generateCaptcha() {
        await this.cleanup();
        this.captcha.generate();
        const text = this.captcha.options.text;
        const uri = this.captcha.uri();
        const captcha = await this.prisma.captcha.create({ data: { text, timestamp: new Date() } });
        return { id: captcha.id, uri };
    }

    async validateCaptcha(id: string, text: string) {
        if (!id || !text) {
            console.log('false bo tak')
            return false;
        }

        await this.cleanup();

        const captcha = await this.prisma.captcha.findUnique({ where: { id } });
        if (captcha && captcha.text === text) {
            await this.prisma.captcha.delete({ where: { id } });
            return true;
        } else {
            return false;
        }
    }

    async cleanup() {
        const some = 5;
        const nowMinusSomeMinutes = new Date(Date.now() - some * 60 * 1000);
        this.prisma.captcha.deleteMany({ where: { timestamp: { lt: nowMinusSomeMinutes } } })
    }
}
