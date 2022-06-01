import { METHOD_POST } from '@lib/controller';
import { generateToken } from '@services/authService';
// import * as account_service from '@services/account_service';

export const tags = ['01.2.회원 정보'];
export const summary = '내 유저 정보 로드';

export const request = {
  path: '/user/{id}',
  method: METHOD_POST,
};

export const security = ['any'];
export const description = '';
export const params = {
  path: { },
  query: {},
};

export const execute = async ({ params, user }) => {
  const accessToken = generateToken(params.id);
  return { accessToken };
};

export const response = {
  200: {},
  401: { description: 'Authentication' },
};

export default execute;
