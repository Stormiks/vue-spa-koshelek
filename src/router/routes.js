const DefaultLayout = () => import('views/layouts/DefaultLayout/DefaultLayout');
const ErrorLayout = () => import('views/layouts/ErrorLayout/ErrorLayout');

export const defaultRoute = {
  path: '/',
  component: DefaultLayout,
  redirect: { name: 'Main' },
  children: [
    {
      path: '',
      name: 'Main',
      component: () => import('views/Main'),
      meta: {
        title: 'Биржа',
      },
    },
    {
      path: 'settings',
      name: 'Settings',
      component: () => import('views/Settings'),
      meta: {
        title: 'Настройки',
      },
    },
  ],
};

export const errorRoute = {
  path: '*',
  component: ErrorLayout,
  redirect: { name: 'Error-Not-Found' },
  children: [
    {
      path: 'page-not-found',
      name: 'Error-Not-Found',
      component: () => import('views/Errors/ErrorNotFound.vue'),
    },
  ],
};

export const routes = [
  defaultRoute,
  errorRoute,
];
