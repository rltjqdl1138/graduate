import { METHOD_GET } from '@lib/controller';
import { getRoute } from '@services/routeService';
// import * as account_service from '@services/account_service';

export const tags = ['01.2.회원 정보'];
export const summary = '내 유저 정보 로드';

export const request = {
  path: '/route',
  method: METHOD_GET,
};

export const security = ['any'];
export const description = '';
export const params = {
  path: { },
  query: { },
};

export const execute = async ({ params, user }) => {
  return getRoute(params)
};

export const response = {
  200: {},
  401: { description: 'Authentication' },
};

export default execute;
