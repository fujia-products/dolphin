import { TOKEN_KEY } from '@pages/login-register/service';
import { notification } from 'antd';
import { NotificationPlacement, IconType } from 'antd/lib/notification';

export const isHttpOrHttpsUrl = (url: string) => {
  const regRule = /(http|https):\/\/([\w.]+\/?)\S*/;

  return regRule.test(url.toLowerCase());
};

export const getToken = (key = TOKEN_KEY) => window.localStorage.getItem(key);

export const myNotification = (options: {
  message: string;
  type?: IconType;
  description?: string;
  placement?: NotificationPlacement;
}) => {
  const { message, type = 'info', description = '', placement = 'bottomRight' } = options;

  notification[type]({
    message,
    description,
    placement,
  });
};
