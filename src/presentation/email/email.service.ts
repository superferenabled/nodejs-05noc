import { Attachment, createTransport } from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

// TODO attachments

export class EmailService {
  private transporter = createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<void> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments: attachments,
      });
      console.log('Email sent:', sentInformation.response);
    } catch (error) {
      console.log({ error });
    }
  }
  async sendEmailWithSystemLogs(to: string): Promise<boolean> {
    try {
      const htmlBody = `
     <h1>Server Logs</h1>
     <ul>
     lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostr
     </ul>`;
      const attachments: Attachment[] = [
        {
          filename: 'logs-all.log',
          path: './logs/logs-all.log',
        },
        {
          filename: 'logs-high.log',
          path: './logs/logs-high.log',
        },
        {
          filename: 'logs-medium.log',
          path: './logs/logs-medium.log',
        },
      ];

      await this.sendEmail({
        to,
        subject: 'Server Logs',
        htmlBody,
        attachments,
      });
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent',
        origin: 'email.service.ts',
      });
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email not sent',
        origin: 'email.service.ts',
      });
      return false;
    }
  }
}
