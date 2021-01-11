// Page home
import HomePage from '../../pages/HomePage.vue';

import $const from '../../constants';

export default {
  path: $const.NAVIGATION.HOME_PAGE.PATH,
  name: $const.NAVIGATION.HOME_PAGE.NAME,
  component: HomePage,
  meta: {
    requiresAuth: true,
  },
};
