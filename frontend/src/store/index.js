import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import authModule from './auth';
import reportsModule from './reports';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule,
    reportsModule,
  },
});
