import type { Context } from '@/router/types';

export default function guest({ next, authStore }: Context) {
  return next();
}
