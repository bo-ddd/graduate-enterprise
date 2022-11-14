import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/positionInfo.html',
      name: 'positionInfo',
      component: ()=> import('@/pages/positionInfo/view/positionInfo.vue'),
    }
    ]
})

export default router;
