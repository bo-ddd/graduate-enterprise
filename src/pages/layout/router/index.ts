import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/pages/layout/view/Home.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout.html',
      name: 'layout',
      alias:"/",
      component: ()=> import('@/pages/layout/view/Layout.vue'),
      children:[
        {
          path: '/home.html',
          name: 'Home',
          component: () => import('@/pages/layout/view/Home.vue')
        },  
        {
          path: '/resume.html',
          name: 'Resume',
          component: () => import('@/pages/layout/view/Resume.vue')
        },
        {
          path: '/position.html',
          name: 'Position',
          component: () => import('@/pages/layout/view/Position.vue')
        },
        {
          path: '/findPersonnel.html',
          name: 'findPersonnel',
          component: () => import('@/pages/layout/view/Personnel.vue')
        },
        {
          path: '/memberCenter.html',
          name: 'MemberCenter',
          component: () => import('@/pages/layout/view/MemberCenter.vue')
        },
      ]
    },
    ]
})

export default router;
