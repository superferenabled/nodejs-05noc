import {createTransport } from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';

export interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  //TODO: attachments:
}

// TODO attachments

export class EmailService{
  private transporter = createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  async sendEmail(options: SendMailOptions): Promise<void> {
    const { to, subject, htmlBody} = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody
      });
      console.log('Email sent:', sentInformation.response)
    } catch (error) {
      console.log({error});
    }
  }

}