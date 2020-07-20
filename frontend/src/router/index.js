import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// Page login
import LoginPage from '../views/LoginPage.vue';

// Page home
import HomePage from '../views/HomePage.vue';

// Pages appointments
import AppointmentsIndex from '../views/Appointments/Index.vue';
import AppointmentsHome from '../views/Appointments/Home.vue';
import AppointmentsCreate from '../views/Appointments/Create.vue';

// Pages customers
import CustomersIndex from '../views/Customers/Index.vue';
import CustomersHome from '../views/Customers/Home.vue';

// Pages reports
import ReportsIndex from '../views/Reports/Index.vue';
import ReportsHome from '../views/Reports/Home.vue';

// Page settings
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
    // name: 'reports-index',
    component: ReportsIndex,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'reports-home',
        component: ReportsHome,
      },
    ],
  },

  {
    path: '/customers',
    // name: 'customers-index',
    component: CustomersIndex,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'customers-home',
        component: CustomersHome,
      },
    ],
  },

  {
    path: '/appointments',
    // name: 'appointments-index',
    component: AppointmentsIndex,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'appointments-home',
        component: AppointmentsHome,
      },
      {
        path: 'create',
        name: 'appointments-create',
        component: AppointmentsCreate,
      },
    ],
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
 * Par ailleur, si nous somme connecté, on ne doit pas pouvoir revenir sur la page de connexion.
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
