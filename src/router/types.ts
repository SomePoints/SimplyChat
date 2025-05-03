import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
import type { StateTree } from 'pinia';
import type { APP_LAYOUT } from '@/layouts/types';

export interface Context {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
  authStore: StateTree;
}

export type MiddlewareReturnValue = boolean | void | RouteLocationRaw;

export type Middleware = (context: Context) => MiddlewareReturnValue | Promise<MiddlewareReturnValue>;

declare module 'vue-router' {
  interface RouteMeta {
    layout: APP_LAYOUT;
    middleware?: Middleware[]
    title?: string;
    name?: string,
  }
}
