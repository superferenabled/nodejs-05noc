import { envs } from '../config/plugins/env.plugin';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation';
import { CronService } from './cron/cron-service';
import { EmailService, SendMailOptions } from './email/email.service';

const logRepository = new LogRepositoryImplementation(
  new MongoLogDataSource(),
);

export class ServerApp {
  public static async start() {

    // console.log('Server started...');
    // console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
    // const emailService = new EmailService();
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute('superferenabled@gmail.com');


    // emailService.sendEmail({
    //   to: 'superferdisabled@gmail.com',
    //   subject: 'Hello',
    //   htmlBody: `<h1>Hello</h1>

    //   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostr</p>
    //   `} as SendMailOptions);

    // emailService.sendEmailWithSystemLogs('superferenabled@gmail.com');

    const logs = await logRepository.getLogs(LogSeverityLevel.medium);
    console.log(logs);

    // const job5 = CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     logRepository,
    //     () => console.log('success'),
    //     (error) => console.log(error),
    //     // ).execute('http://localhost:3000');
    //   ).execute('https://www.google.com');
    // });
  }
}
