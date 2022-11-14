import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/setEnterpriseInfo.html',
      name: 'setEnterpriseInfo',
      component: ()=> import('@/pages/setEnterpriseInfo/view/setEnterpriseInfo.vue'),
    }
    ]
})

export default router;
