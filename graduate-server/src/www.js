import http from 'http';
import logger from '@lib/logger';
import io from 'socket.io';
import config from './config';
import appRun from './app';

appRun().then(({ app, setSocket }) => {
  const server = http.createServer(app);
  server.listen(config.port, () => {
    const log = {
      method: 'START', type: 'SERVER', env: config.app, port: config.port,
    };
    logger({ type: 'logging', topic: 'server', message: JSON.stringify(log) });
  });
  const ioo = io(server);
  setSocket(ioo);
});
