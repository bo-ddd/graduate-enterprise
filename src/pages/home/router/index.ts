import { createRouter, createWebHistory } from 'vue-router';
import Api from "@/api/api";
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

interface Res {
  code: number,
  data: string | [] | any,
  msg: string,
}

router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('token');
  const registeredOrNot = () => {
    Api.getEnterpriseInfo({}).then((res: Res | any) => {
      if (res.data == null) {
        window.location.href = 'setEnterpriseInfo.html';
      }
    });
  }
  registeredOrNot();
  if(!token && to.name != 'login'){
    window.location.href = 'login.html';
  }else{
    next();
  }
})           

export default router;
