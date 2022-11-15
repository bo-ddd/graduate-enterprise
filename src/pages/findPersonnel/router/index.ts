import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/findPersonnel.html',
      name: 'findPersonnel',
      component: () => import('@/pages/findPersonnel/view/Personnel.vue')
    },
    ]
})

export default router;
