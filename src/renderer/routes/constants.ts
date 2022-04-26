export const ROUTER = {
  home: '/',
  login: '/login',
  counter: '/counter',
};

export const ROUTER_KEYS = {
  home: 'home',
  login: 'login',
  counter: 'counter',
};

export const ROUTER_ENTRY: IRouter.Item[] = [
  {
    url: ROUTER.counter,
    key: ROUTER_KEYS.counter,
    text: '计数器',
  },
];
