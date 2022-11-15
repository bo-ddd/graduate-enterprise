import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/resume.html',
      name: 'Resume',
      component: () => import('@/pages/resume/view/Resume.vue')
    },
    ]
})

export default router;
