import { createRouter, createWebHistory } from 'vue-router';
import { useHomeStore } from '@/stores/home';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home.html',
      name: 'home',
      alias: "/",
      component: () => import('@/pages/home/view/Home.vue')
    },
  ]
})

interface Res {
  code: number,
  data: string | [] | any,
  msg: string,
}

router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem('token');
  const use = useHomeStore();
  const res = await use.getEnterprise({});
  if (res.data == null) {
    window.location.href = 'setEnterpriseInfo.html';
  }

  if (!token && to.name != 'login') {
    window.location.href = 'login.html';
  } else {
    next();
  }
})

export default router;
