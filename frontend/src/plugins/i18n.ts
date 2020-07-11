import Vue from 'vue';
import VueI18n from 'vue-i18n';
import constants from '@/constants';
import messages from '@/i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: constants.CONFIG.LOCAL.FR,
  messages,
});

const translate = (key: string) => {
  if (!key) {
    return '';
  }
  return i18n.t(key);
};

export { i18n, translate };
