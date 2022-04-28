import { Request } from '@fujia/fetch';
import { TOKEN_KEY } from '@pages/login-register/service';

import { getToken } from '@utils/index';

export interface IResponse<D = any> {
  success: boolean;
  data?: D;
  msg?: string;
}

export const request = Request.create({
  baseUrl: 'http://localhost:3001',
  requestInterceptor: (config) => {
    const token = getToken(TOKEN_KEY);

    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
});
