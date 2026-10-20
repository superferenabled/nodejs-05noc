import 'dotenv/config';
import { ServerApp } from './presentation/server';
import { envs } from './config/plugins/env.plugin';
import { LogModel, MongoDatabase } from './data/mongo';

const main = async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // Create a collection = tables, document = register
  const newLog = await LogModel.create({
    message: 'Test message from mongo',
    level: 'low',
    origin: 'App.ts',
  });

  await newLog.save();
  console.log(newLog);

  const logs = await LogModel.find();
  console.log(logs);

  ServerApp.start();
  console.log(envs.MAILER_EMAIL);
};

(async () => {
  main();
})();
