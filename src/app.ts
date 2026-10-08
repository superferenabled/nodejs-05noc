import 'dotenv/config';
import { ServerApp } from './presentation/server';
import { envs } from './config/plugins/env.plugin';

const main = () => {
  ServerApp.start();
  console.log(envs.MAILER_EMAIL);
};

(async () => {
  main();
})();
