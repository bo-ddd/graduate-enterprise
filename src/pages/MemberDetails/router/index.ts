import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/memberDetails.html',
      name: 'memberDetails',
      component: ()=> import('@/pages/MemberDetails/view/MemberDetails.vue'),
    }
    ]
})

export default router;
