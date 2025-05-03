import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';
import middlewarePipeline from '@/router/middlewarePipeline';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    authStore,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

router.beforeResolve(async (to, from, next) => {
  next();
});

export default router;
