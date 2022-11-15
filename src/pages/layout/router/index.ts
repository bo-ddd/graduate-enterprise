import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout.html',
      name: 'layout',
      alias:"/",
      component: ()=> import('@/pages/layout/view/Layout.vue'),
    },
    ]
})

export default router;
