import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import * as fs from 'fs';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = (): void => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;

        fs.writeFileSync(path, '');
      },
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogsPath, logAsJson);
    if (newLog.level === LogSeverityLevel.low) return;
    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logsPath = this.getLogsPath(severityLevel);
    const logs = this.getLogsFromFile(logsPath);
    return logs;
  }

  getLogsFromFile(logsPath: string): LogEntity[] {
    if (!fs.existsSync(logsPath)) return [];
    const logData = fs.readFileSync(logsPath, 'utf-8');
    // const logArray = logData.split('\n').map((log) => LogEntity.fromJSON(log));
    const logArray = logData.split('\n').map(LogEntity.fromJSON);
    return logArray.filter((log) => log !== null);
  }

  private getLogsPath(severityLevel: LogSeverityLevel): string {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.allLogsPath;
      case LogSeverityLevel.medium:
        return this.mediumLogsPath;
      case LogSeverityLevel.high:
        return this.highLogsPath;
      default:
        throw new Error(
          `${severityLevel} is not a valid severity level. Valid levels are low, medium, and high. `,
        );
    }
  }
}
