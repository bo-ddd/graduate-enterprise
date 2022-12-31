import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login.html',
      name: 'login',
      component: () => import('@/pages/login/view/login.vue'),
    }
  ]
})



router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    window.location.href = '/';
  } else {
    next();
  }
})
export default router;
