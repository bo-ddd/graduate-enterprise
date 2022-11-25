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

router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('token');
  if(!token && to.name != 'login'){
    window.location.href = 'login.html';
  }else{
    next();
  }
})           

export default router;
