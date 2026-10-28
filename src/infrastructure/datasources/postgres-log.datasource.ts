import { LogModel, PostgresDataSource as datasource } from '../../data/postgres';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import {  } from "../../data/postgres";

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await datasource?.createQueryBuilder().insert().into(LogModel).values({...log}).execute();
    console.log('Postgres Log Created!');
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await datasource?.getRepository(LogModel).find({ where: { level: severityLevel } });
    return logs?.map(LogEntity.fromObject) || [];
  }
}
