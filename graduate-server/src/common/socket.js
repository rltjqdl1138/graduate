import jwtAuth from 'socketio-jwt-auth';
import { jwtCallback, jwtConfig } from '@services/authService';
import { startRoute, endRoute, moveRoute } from '@services/routeService';
// import * as chatting_service from '@services/chatting_service';
// import mqttAdapter from './socket.io-mqtt';
// import CONFIG from '../../config/config';

let io = null;
export const setSocket = (_io) => {
  io = _io;

  io.use(
    jwtAuth.authenticate(
      { secret: jwtConfig.secretOrKey, algorithm: 'HS256' },
      jwtCallback,
    ),
  );

  io.on('connection', (socket) => {
    const { user } = socket.request;
    socket.on('start', async (msg) => startRoute(msg, user));
    socket.on('move', async (msg) => {
      const val = moveRoute(msg, user)
      console.log(val)
      if( val ) io.emit('move', {...msg, id:user.id} )
    });
    socket.on('end', async (msg) => endRoute(msg, user));
  });
};

export default {
  setSocket,
};
