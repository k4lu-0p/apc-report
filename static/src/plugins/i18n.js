import Vue from 'vue';
import VueI18n from 'vue-i18n';
import constants from '@/constants';
import messages from '@/i18n';

Vue.use(VueI18n);

export default new VueI18n({
  locale: constants.LOCAL.FR,
  messages,
});
