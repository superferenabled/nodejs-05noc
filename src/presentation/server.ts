import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource(),
);

export class ServerApp {
  public static start() {
    console.log('Server started...');
    const job5 = CronService.createJob('*/5 * * * * *', () => {
      new CheckService(
        fileSystemLogRepository,
        () => console.log('success'),
        (error) => console.log(error),
      // ).execute('http://localhost:3000');
      ).execute('https://www.google.com');
    });
  }
}
