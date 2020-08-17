// routes: setting

import IndexSettingPage from '../../pages/setting-pages/IndexSettingPage.vue';
import HomeSettingPage from '../../pages/setting-pages/HomeSettingPage.vue';

import $const from '../../constants';

export default {
  path: $const.NAVIGATION.INDEX_SETTING_PAGE.PATH,
  component: IndexSettingPage,
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: $const.NAVIGATION.HOME_SETTING_PAGE.PATH,
      name: $const.NAVIGATION.HOME_SETTING_PAGE.NAME,
      component: HomeSettingPage,
    },
  ],
};
