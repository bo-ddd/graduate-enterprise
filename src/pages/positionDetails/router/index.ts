import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/positionDetails.html',
      name: 'positionDetails',
      component: ()=> import('@/pages/positionDetails/view/positionDetails.vue'),
    }
    ]
})

export default router;
