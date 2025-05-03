import type { RouteRecordRaw } from 'vue-router';
import home from '@/router/modules/home';
import auth from '@/router/modules/auth';

export const routes: Array<RouteRecordRaw> = [
  ...home,
  ...auth,
];
