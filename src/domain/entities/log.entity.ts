export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor({
    level,
    message,
    origin,
    createdAt = new Date(),
  }: LogEntityOptions) {
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJSON(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json) as {
      message: string;
      level: LogSeverityLevel;
      createdAt: Date;
    };
    const log = new LogEntity({
      level,
      message,
      origin: 'log.entity.ts',
    } as LogEntityOptions);
    return log;
  }
}
