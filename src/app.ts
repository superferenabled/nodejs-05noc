import 'dotenv/config';
import { ServerApp } from './presentation/server';
import { envs } from './config/plugins/env.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import { PostgresDatabase } from './data/postgres';

const main = async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  await PostgresDatabase.connect({
    username: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    database: envs.POSTGRES_DB,
  });

  ServerApp.start();
};

(async () => {
  main();
})();
