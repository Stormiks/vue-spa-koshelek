const DefaultLayout = () => import('views/layouts/DefaultLayout/DefaultLayout');
const ErrorLayout = () => import('views/layouts/ErrorLayout/ErrorLayout');

export const defaultRoute = {
  path: '/',
  component: DefaultLayout,
  redirect: { name: 'Trade' },
  children: [
    {
      path: 'trade',
      name: 'Trade',
      component: () => import('views/Trade'),
      meta: {
        title: 'Биржа',
      },
    },
    {
      path: 'statistics',
      name: 'Statistics',
      component: () => import('views/Statistics'),
      meta: {
        title: 'Статистика',
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
