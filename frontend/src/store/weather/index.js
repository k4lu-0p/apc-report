/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import Vue from 'vue';
import Vuex from 'vuex';

import api from '../../services/weatherApi';
import $const from '../../constants';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    current: {},
    forecasts: [],
    status: '',
  },
  getters: {
    getCurrent: (state) => state.current,
    getForecasts: (state) => state.forecasts.filter((forecast, index) => {
      if (index >= 1 && index <= 3) {
        return forecast;
      }
    }),
    getStatus: (state) => state.status,
  },
  mutations: {
    UPDATE_CURRENT_WEATHER(state, current) {
      state.current = current;
    },
    UPDATE_FORECASTS_WEATHER(state, forecasts) {
      state.forecasts = forecasts;
    },
    UPDATE_STATUS(state, status) {
      state.status = status;
    },
  },
  actions: {
    async updateWeather({ commit }) {
      try {
        commit('UPDATE_STATUS', $const.API.STATUS.LOADING);

        const apiCurrentWeather = await api.instanciateCurrentWeather();
        const apiForecastsWeather = await api.instanciateForecastsWeather();

        const { data: current } = await apiCurrentWeather.get();
        const { data: { hourly: forecasts } } = await apiForecastsWeather.get();

        commit('UPDATE_CURRENT_WEATHER', current);
        commit('UPDATE_FORECASTS_WEATHER', forecasts);

        commit('UPDATE_STATUS', $const.API.STATUS.SUCCESS);
      } catch (error) {
        commit('UPDATE_STATUS', $const.API.STATUS.ERROR);
        throw error;
      }
    },
  },
};
