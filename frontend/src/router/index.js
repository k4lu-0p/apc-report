import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// Pages
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import UsersPage from '../views/UsersPage.vue';
import ReportsPage from '../views/ReportsPage.vue';
import SupportPage from '../views/SupportPage.vue';
import SettingsPage from '../views/SettingsPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reports',
    name: 'reports-page',
    component: ReportsPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users',
    name: 'users-page',
    component: UsersPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/support',
    name: 'support-page',
    component: SupportPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings-page',
    component: SettingsPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login-page',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      if (store.getters['authModule/isLoggedIn']) {
        next('/');
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

/**
 * Avant chaques accès à une page, on vérifie si la méta requiresAuth est présente,
 * et si elle est à true grâce à la fonction some(). Cela signifie que la route sur laquelle on
 * accède demande d'être authentifiée. Si on ne l'est pas, alors redirige nous vers
 * la page d'authentification. Le cas d'une page qui ne nécéssite pas
 * d'authentification est également géré.
 * Ègalement, si nous somme connecté, on ne doit pas pouvoir revenir sur la page de connexion.
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['authModule/isLoggedIn']) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
