import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envSchema } from '../../configs/env/env.config';
import { ok } from 'assert';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private readonly transporter: nodemailer.Transporter;

    constructor() {
        const env = envSchema.parse(process.env);

        this.transporter = nodemailer.createTransport({
            host: env.EMAIL_HOST,
            port: env.EMAIL_PORT,
            secure: false,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS,
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        const env = envSchema.parse(process.env);

        try {
            await this.transporter.sendMail({
                from: `"English Learning" <${env.EMAIL_USER}>`,
                to,
                subject,
                html,
            });
            this.logger.log(`Email sent to ${to}`);
            return ok(true, 'Email sent successfully');
        } catch (err) {
            this.logger.error(`Failed to send email: ${err.message}`);
            throw new Error(err.message);
        }
    }
}
