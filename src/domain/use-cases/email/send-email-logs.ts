import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithSystemLogs(
        to as string,
      );
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Log Email Sent',
        origin: 'send-email-logs.ts',
      });
      this.logRepository.saveLog(log);
      return sent;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Log Email not Sent',
        origin: 'send-email-logs.ts',
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
