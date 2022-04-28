import { TOKEN_KEY } from '@pages/login-register/service';

export const isHttpOrHttpsUrl = (url: string) => {
  const regRule = /(http|https):\/\/([\w.]+\/?)\S*/;

  return regRule.test(url.toLowerCase());
};

export const getToken = (key = TOKEN_KEY) => window.localStorage.getItem(key);
