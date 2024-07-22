import { createRouter, createWebHashHistory } from 'vue-router';
import SignIn from '../Pages/SignIn/SignInComponent.vue';
import SignUp from '../Pages/SignUp/SignUpComponent.vue';
import Dashboard from '../Pages/InicialPage/DashBoardComponent.vue';

const routes = [
  {
    path: '/',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // Verifique se a rota requer autenticação
  if (to.meta.requiresAuth) {
    // Verifique se há um token de autenticação no armazenamento local
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      // Se o token não estiver presente, redirecione para a página de login
      next({ name: 'signin' });
    } else {
      // Se o token estiver presente, permita o acesso à rota
      next();
    }
  } else {
    // Se a rota não requer autenticação, permita o acesso
    next();
  }
});

export default router;
