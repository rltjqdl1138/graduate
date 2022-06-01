// import logger from '@lib/logger';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import getRoute from '@lib/controller';
import { setSocket } from './common/socket';

const appRun = async () => {
  const controllers = await getRoute();

  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json({ limit: '500mb' }));
  app.use(express.urlencoded({ limit: '500mb', extended: false }));
  app.use(passport.initialize({ passReqToCallback: true }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use('/v1', controllers.router);

  app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200);
    return res.send('Welcome');
  });

  // 커스텀 404 페이지
  app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
  });

  // 커스텀 500 페이지
  app.use((err, req, res) => {
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
  });

  return { app, setSocket };
};

export default appRun;
