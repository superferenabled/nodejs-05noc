import { envs } from '../config/plugins/env.plugin';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation';
import { CronService } from './cron/cron-service';
import { EmailService, SendMailOptions } from './email/email.service';

const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);
const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDataSource()
);
const postgresLogRepository = new LogRepositoryImplementation(
  new PostgresLogDataSource()
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

    // logRepository.saveLog({
    //   level: LogSeverityLevel.medium,
    //   message: 'This is a medium severity log message',
    //   createdAt: new Date(),
    //   origin: 'Server',
    // });

    // const logs = await logRepository.getLogs(LogSeverityLevel.medium);
    // console.log(logs);

    const job5 = CronService.createJob('*/5 * * * * *', () => {
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log('success'),
        (error) => console.log(error),
        // ).execute('http://localhost:3000');
      ).execute('https://www.google.com');
    });
  }
}
