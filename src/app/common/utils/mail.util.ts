import { MailService } from '../../configs/mail/mail.service';

export async function sendEmail(
    to: string,
    subject: string,
    templateName: string,
    context: any,
): Promise<void> {
    const mailService = new MailService();
    await mailService.sendMail(to, subject, templateName, context);
}