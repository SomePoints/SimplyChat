import guest from '@/router/middlewares/guest';
import { APP_LAYOUT } from '@/layouts/types';

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/ChatView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [guest],
    },
  },
];
