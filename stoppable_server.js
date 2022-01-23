import { createTerminus } from '@godaddy/terminus';
import stoppable from 'stoppable';

import app from './src/app';

const server = stoppable(
  app.listen(process.env.PORT, () => {
    console.log(`Express API running on port ${process.env.PORT}`);
  }),
);

const onSignal = () => {
  console.log('Received SIGTERM, closing down...');

  return new Promise((resolve, reject) => {
    server.stop(err => {
      if (err) {
        reject(err);
      }
      resolve(0);
    });
  });
};

const onHealthCheck = () => Promise.resolve();

createTerminus(server, {
  healthChecks: {
    '/healthz': onHealthCheck,
  },
  signals: ['SIGINT', 'SIGTERM'],
  onSignal,
});