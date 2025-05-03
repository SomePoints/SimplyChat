import guest from '@/router/middlewares/guest';
import { APP_LAYOUT } from '@/layouts/types';

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: APP_LAYOUT.AUTH,
      middleware: [guest],
      pageTitle: 'Добро пожаловать',
    },
  },
];
