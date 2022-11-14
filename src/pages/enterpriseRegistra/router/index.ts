import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/enterpriseRegistra.html',
      name: 'enterpriseRegistra',
      component: ()=> import('@/pages/enterpriseRegistra/view/enterpriseRegistra.vue'),
    }
    ]
})

export default router;
