import { DataSource } from 'typeorm';
import { envs } from '../../config/plugins/env.plugin';

interface ConnectionOptions {
  username: string;
  password: string;
  database: string;
}

export let PostgresDataSource: DataSource | null = null;

export class PostgresDatabase {
  static async connect(options: ConnectionOptions) {
    PostgresDataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: envs.POSTGRES_USER,
      password: envs.POSTGRES_PASSWORD,
      database: envs.POSTGRES_DB,
      entities: [__dirname + '/entities/**/*{.js,.ts}'],
      synchronize: true,
      logging: true,
      migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
    });

    try {
      await PostgresDataSource.initialize();
      console.log('Data Source has been initialized!');
    } catch (error) {
      console.error('Error during Data Source initialization', error);
    }
  }
}
