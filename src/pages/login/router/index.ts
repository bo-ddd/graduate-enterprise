import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login.html',
      name: 'login',
      component: ()=> import('@/pages/login/view/login.vue'),
    }
    ]
})

export default router;
