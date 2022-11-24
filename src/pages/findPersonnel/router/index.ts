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
router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('token');
  if(!token){
    window.location.href = 'login.html';
  }else{
    next();
  }
})  
export default router;
