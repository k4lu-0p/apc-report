import ModuleMaker from 'vuex-module-maker';
import axios from 'axios';
import $const from '../../constants';

const template = {
  instructions: {
    status: 'string',
    reports: {
      type: 'array',
      // initial_value: JSON.parse(localStorage.getItem('reports')) || [],
      initial_value: [],
    },
  },
  actions: {
    fetchReports: async ({ commit, rootState }, params) => {
      const { authModule: { token } } = rootState;

      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.FETCH_REPORTS}`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      };

      try {
        commit('setStatus', $const.API.STATUS.LOADING);

        const { data: { data: reports } } = await axios.get(endpoint, config);
        commit('setReports', reports);

        commit('setStatus', $const.API.STATUS.SUCCESS);
      } catch (error) {
        commit('setStatus', $const.API.STATUS.ERROR);
        if (error.response) {
          if (error.response.status === 401) {
            commit('setStatus', $const.API.STATUS.UNAUTHORIZED);
          }
        }
      }
    },
    putReport: async ({ commit, rootState }, payload) => {
      commit('setReports', []);

      const { id, responses } = payload;
      const { authModule: { token } } = rootState;
      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.UPDATE_REPORT}${id}`;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        commit('setStatus', $const.API.STATUS.LOADING);
        await axios.put(endpoint, { responses }, config);
        commit('setStatus', $const.API.STATUS.SUCCESS);
      } catch (error) {
        commit('setStatus', $const.API.STATUS.ERROR);
        if (error.response) {
          if (error.response.status === 401) {
            commit('setStatus', $const.API.STATUS.UNAUTHORIZED);
          }
        }
      }
    },
  },
  getters: {
    getReportById: (state) => (id) => state.reports.find((report) => report.id === id),
    getLastReport: (state) => state.reports[state.reports.length - 1],
  },
  mutations: {
    removeReport: (state, id) => {
      state.reports = state.reports.filter((report) => report.id !== id);
    },
  },
};

const config = {
  namespaced: true,
};

export default ModuleMaker.Make(template, config);
