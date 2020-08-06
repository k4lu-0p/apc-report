import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import axios from 'axios';
import moment from 'moment';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue';
import StarRating from 'vue-star-rating';
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
Vue.use(Vue2TouchEvents);

// Configurations
Vue.config.productionTip = false;
moment.locale('fr');

// Utilitaires globaux
Vue.prototype.$const = constants;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

// Composants globaux
Vue.component('moon-loader', MoonLoader);
Vue.component('datetime', Datetime);
Vue.component('star-rating', StarRating);

// eslint-disable-next-line prefer-arrow-callback
Vue.filter('fahrenheit', (value) => {
  if (!value) return 0;
  const v = Number(value);
  return Math.round(v - 273.15);
});

// eslint-disable-next-line prefer-arrow-callback
Vue.filter('capitalize', (value) => {
  if (!value) return '';
  const v = String(value);
  return v.charAt(0).toUpperCase() + v.slice(1);
});

// global mixin
Vue.mixin({
  methods: {
    goTo(name, id = null, params = {}) {
      this.$router.push({
        name,
        params: {
          id,
          ...params,
        },
      });
    },
  },
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
