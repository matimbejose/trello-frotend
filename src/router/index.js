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
  /// Checks if the route requires authentication
  if (to.meta.requiresAuth) {
   // Check local storage for an authentication token
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      // If token is not present, redirect to login page
      next({ name: 'signin' });
    } else {
      // If the token is present, allow access to the route
      next();
    }
  } else {
    // If the route does not require authentication, allow access
    next();
  }
});

export default router;
