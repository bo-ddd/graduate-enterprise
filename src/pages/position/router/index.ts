import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/position.html',
      name: 'Position',
      component: () => import('@/pages/position/view/Position.vue')
    }
    ]
})

export default router;
