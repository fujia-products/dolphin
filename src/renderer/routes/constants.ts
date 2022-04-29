export const ROUTER = {
  home: '/',
  login: '/login',
  register: '/register',
  counter: '/counter',
  develop: '/develop',
  tools: '/tools',
  services: '/services',
  apps: '/apps',
};

export const ROUTER_KEYS = {
  home: 'home',
  login: 'login',
  register: 'register',
  counter: 'counter',
  develop: 'develop',
  tools: 'tools',
  services: 'services',
  apps: 'apps',
};

export const ROUTER_ENTRY: IRouter.Item[] = [
  {
    url: ROUTER.counter,
    key: ROUTER_KEYS.counter,
    text: '计数器',
  },
];
