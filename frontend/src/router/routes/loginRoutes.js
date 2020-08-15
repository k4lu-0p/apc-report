// routes: login

import LoginPage from '../../pages/LoginPage.vue';

import $const from '../../constants';

export default {
  path: $const.NAVIGATION.LOGIN_PAGE.PATH,
  name: $const.NAVIGATION.LOGIN_PAGE.NAME,
  component: LoginPage,
};
