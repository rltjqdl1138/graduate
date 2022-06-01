import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

const PASSWORD = 'aaaa';
export const jwtCallback = async (payload, done) => {
  try {
    const user = { id: payload.id };
    done(null, user);
  } catch (e) {
    done(e);
  }
};

export const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PASSWORD,
};
passport.use('jwt', new JwtStrategy(jwtConfig, jwtCallback));

export const generateToken = (id) => {
  const accessToken = jwt.sign({ id }, PASSWORD, { expiresIn: '1d' });
  return accessToken;
};
