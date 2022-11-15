import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home.html',
      name: 'home',
      alias:"/",
      component: () => import('@/pages/home/view/Home.vue')
    },  
    ]
})

export default router;
