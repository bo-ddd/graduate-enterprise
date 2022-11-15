import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/memberCenter.html',
      name: 'MemberCenter',
      component: () => import('@/pages/memberCenter/view/MemberCenter.vue')
    },
    ]
})

export default router;
