import { createRouter, createWebHistory } from 'vue-router';

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

router.beforeEach((to,from)=>{
  const token = sessionStorage.getItem('token');
  console.log(token);
  if( !token ){
  //  router.push({name:'login.html'})
  return true
  }
})

export default router;
