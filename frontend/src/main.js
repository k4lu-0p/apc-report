import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue';
import { Datetime } from 'vue-datetime';
import constants from './constants';
import App from './App.vue';
import router from './router';
import store from './store';

// Service Worker
// import './registerServiceWorker';

// Librairies CSS
import './assets/tailwind.css';
import 'animate.css/animate.compat.css';
import 'vue-datetime/dist/vue-datetime.css';

// Plugins
import './plugins/vuelidate';
import i18n from './plugins/i18n';

// Dependencies
Vue.use(Datetime);

// Configurations
Vue.config.productionTip = false;

// Utilitaires globaux
Vue.prototype.$const = constants;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

// Composants globaux
Vue.component('moon-loader', MoonLoader);
Vue.component('datetime', Datetime);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
