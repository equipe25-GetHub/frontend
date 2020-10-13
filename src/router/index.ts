import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { Authentication } from '../store';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [  
  {
    path: '/',
    name: 'Unauthenticate',
    component: () => import('@/layout/Unauthenticate.vue'),
    children:[
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Register.vue')
      },

    ]
  },{
  path: '/',
  name: 'Authenticate',
  component: () => import('@/layout/Authenticate.vue'),
  meta: { requiresAuth: true },
  children:[
    {
      path: 'home',
      name: 'Home',
      meta: { requiresAuth: true },
      component: () => import('@/views/Home.vue')
    },
    {
      path: 'network/search',
      name: 'Network',
      meta: { requiresAuth: true },
      component: () => import('./../views/network/Search.vue'),
    },
    {
      path: 'loan/dashboard',
      name: 'Dashboard',
      meta: { requiresAuth: true },
      component: () => import('./../views/loan/Dashboard.vue'),
    },
    {
      path: 'loan/simulator',
      name: 'Simulator',
      meta: { requiresAuth: true },
      component: () => import('./../views/loan/Simulator.vue'),
    },{
      path: 'loan/hiring',
      name: 'Hiring',
      meta: { requiresAuth: true },
      component: () => import('./../views/loan/Hiring.vue'),
    },
  ]},
  {
    path: '*',
    name: 'not-found',
    component: () => import('@/views/404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('estou aqui')
    if (!Authentication.getters.getStatusLoggedIn.value) {
      next('/login');
    } else {
      next();
    }
  } else if (to.path === '/login' && Authentication.getters.getStatusLoggedIn.value) {
    next('/home');
  } else if (to.path === '/') {
    if (!Authentication.getters.getStatusLoggedIn.value) next('/login');
    else next('/home');
  } else next();
});
export default router;
