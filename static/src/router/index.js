import Vue from 'vue';
import VueRouter from 'vue-router';

import appointmentRoutes from './routes/appointmentRoutes';
import reportRoutes from './routes/reportRoutes';
import customerRoutes from './routes/customerRoutes';
import loginRoutes from './routes/loginRoutes';
import settingRoutes from './routes/settingRoutes';
import homeRoutes from './routes/homeRoutes';

import authChecker from './middlewares/authCheckerMiddleware';

Vue.use(VueRouter);

const routes = [
  appointmentRoutes,
  reportRoutes,
  customerRoutes,
  loginRoutes,
  settingRoutes,
  homeRoutes,
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// middlewares
router.beforeEach(authChecker.beforeEach);

export default router;
