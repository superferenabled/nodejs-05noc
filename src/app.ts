import { CronJob } from 'cron';
import { ServerApp } from './presentation/server';

const main = () => {
  ServerApp.start();
  const job = new CronJob('*/3 * * * * *', () => {
    const date = new Date();
    console.log('every 3 seconds ', date);
  });
  job.start();
};

(async () => {
  main();
})();
