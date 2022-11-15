import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/agreement.html',
      name: 'agreement',
      component: () => import('@/pages/agreement/view/Agreement.vue'),
    }
  ]
})

export default router;
