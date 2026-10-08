import { envs } from '../config/plugins/env.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation';
import { CronService } from './cron/cron-service';
import { EmailService, SendMailOptions } from './email/email.plugin';

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource(),
);

export class ServerApp {
  public static start() {
    console.log('Server started...');
    console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'superferdisabled@gmail.com',
      subject: 'Hello',
      htmlBody: `<h1>Hello</h1>
      
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostr</p>
      `} as SendMailOptions);

    // const job5 = CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log('success'),
    //     (error) => console.log(error),
    //     // ).execute('http://localhost:3000');
    //   ).execute('https://www.google.com');
    // });
  }
}
