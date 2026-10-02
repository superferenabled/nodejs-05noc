import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCalback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService {
  constructor(
    private readonly logRepository: LogRepository, // Inject the LogRepository dependency
    private readonly successCallback?: SuccessCalback,
    private readonly errorCallback?: ErrorCallback,
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity(
        LogSeverityLevel.low,
        `Check service ${url} success`,
      );
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {

      const log = new LogEntity(
        LogSeverityLevel.high,
        `Error on check service ${url}: ${error}`,
      );
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback((error as Error).message);
      return false;
    }
  }
}
