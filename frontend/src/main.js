import Vue from 'vue';
import constants from '@/constants';
import axios from 'axios';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Service Worker
// import './registerServiceWorker';

// Librairies CSS
import './assets/tailwind.css';
import 'animate.css/animate.compat.css';

// Plugins
import './plugins/vuelidate';
import i18n from './plugins/i18n';

// Configurations
Vue.config.productionTip = false;
Vue.config.$axios = axios;

// Utilitaires globaux
Vue.prototype.$const = constants;

// Composants globaux
Vue.component('moon-loader', MoonLoader);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
