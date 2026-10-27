import 'dotenv/config';
import { ServerApp } from './presentation/server';
import { envs } from './config/plugins/env.plugin';
import { LogModel, MongoDatabase } from './data/mongo';

const main = async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // ServerApp.start();
};

(async () => {
  main();
})();
