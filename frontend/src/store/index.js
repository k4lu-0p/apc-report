import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import authModule from './auth';
import reportsModule from './reports';
import appointmentsModule from './appointments';
import customersModule from './customers';
import settingsModule from './settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule,
    reportsModule,
    appointmentsModule,
    customersModule,
    settingsModule,
  },
});
