import type { Context } from '@/router/types';

export default function auth({ next, authStore }: Context) {
  return next();
}
