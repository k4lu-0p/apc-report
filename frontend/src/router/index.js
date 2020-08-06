import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import $const from '../constants';

// Page login
import LoginIndex from '../views/Login/Index.vue';

// Page home
import HomeIndex from '../views/Home/Index.vue';

// Pages appointments
import AppointmentsIndex from '../views/Appointments/Index.vue';
import AppointmentsHome from '../views/Appointments/Home.vue';
import AppointmentsCreate from '../views/Appointments/Create.vue';
import AppointmentsShow from '../views/Appointments/Show.vue';

// Pages customers
import CustomersIndex from '../views/Customers/Index.vue';
import CustomersHome from '../views/Customers/Home.vue';
import CustomersShow from '../views/Customers/Show.vue';
import CustomersEdit from '../views/Customers/Edit.vue';

// Pages reports
import ReportsIndex from '../views/Reports/Index.vue';
import ReportsHome from '../views/Reports/Home.vue';
import ReportsEdit from '../views/Reports/Edit.vue';

// Page settings
import SettingsIndex from '../views/Settings/Index.vue';
import SettingsHome from '../views/Settings/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: $const.NAVIGATION.HOME_INDEX.PATH,
    name: $const.NAVIGATION.HOME_INDEX.NAME,
    component: HomeIndex,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: $const.NAVIGATION.REPORTS_INDEX.PATH,
    // name: 'reports-index',
    component: ReportsIndex,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: $const.NAVIGATION.REPORTS_HOME.PATH,
        name: $const.NAVIGATION.REPORTS_HOME.NAME,
        component: ReportsHome,
      },
      {
        path: $const.NAVIGATION.REPORTS_EDIT.PATH,
        name: $const.NAVIGATION.REPORTS_EDIT.NAME,
        component: ReportsEdit,
      },
    ],
  },

  {
    path: $const.NAVIGATION.CUSTOMERS_INDEX.PATH,
    // name: 'customers-index',
    component: CustomersIndex,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: $const.NAVIGATION.CUSTOMERS_HOME.PATH,
        name: $const.NAVIGATION.CUSTOMERS_HOME.NAME,
        component: CustomersHome,
      },
      {
        path: $const.NAVIGATION.CUSTOMERS_SHOW.PATH,
        name: $const.NAVIGATION.CUSTOMERS_SHOW.NAME,
        component: CustomersShow,
      },
      {
        path: $const.NAVIGATION.CUSTOMERS_EDIT.PATH,
        name: $const.NAVIGATION.CUSTOMERS_EDIT.NAME,
        component: CustomersEdit,
        props: true,
      },
    ],
  },

  {
    path: $const.NAVIGATION.APPOINTMENTS_INDEX.PATH,
    // name: 'appointments-index',
    component: AppointmentsIndex,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: $const.NAVIGATION.APPOINTMENTS_HOME.PATH,
        name: $const.NAVIGATION.APPOINTMENTS_HOME.NAME,
        component: AppointmentsHome,
      },
      {
        path: $const.NAVIGATION.APPOINTMENTS_CREATE.PATH,
        name: $const.NAVIGATION.APPOINTMENTS_CREATE.NAME,
        component: AppointmentsCreate,
        props: true,
      },
      {
        path: $const.NAVIGATION.APPOINTMENTS_SHOW.PATH,
        name: $const.NAVIGATION.APPOINTMENTS_SHOW.NAME,
        component: AppointmentsShow,
        props: true,
      },
    ],
  },

  {
    path: $const.NAVIGATION.SETTINGS_INDEX.PATH,
    // name: $const.NAVIGATION.SETTINGS_INDEX.NAME,
    component: SettingsIndex,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: $const.NAVIGATION.SETTINGS_HOME.PATH,
        name: $const.NAVIGATION.SETTINGS_HOME.NAME,
        component: SettingsHome,
      },
    ],
  },

  {
    path: $const.NAVIGATION.LOGIN_INDEX.PATH,
    name: $const.NAVIGATION.LOGIN_INDEX.NAME,
    component: LoginIndex,
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
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
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
      next($const.NAVIGATION.LOGIN_INDEX.PATH);
    }
  } else {
    next();
  }
});

export default router;
