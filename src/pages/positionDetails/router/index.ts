import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/positionDetails.html',
      name: 'positionDetails',
      component: ()=> import('@/pages/positionDetails/view/positionDetails.vue'),
    }
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
