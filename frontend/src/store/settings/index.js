import ModuleMaker from 'vuex-module-maker';
import axios from 'axios';
import $const from '../../constants';

const template = {
  instructions: {
    status: 'string',
    settings: {
      type: 'array',
      initial_value: JSON.parse(localStorage.getItem('settings')) || [],
      // initial_value: [],
    },
  },
  actions: {
    fetchSettings: async ({ commit, rootState }) => {
      const { authModule: { token } } = rootState;
      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.FETCH_SETTINGS}`;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        commit('setStatus', $const.API.STATUS.LOADING);
        const { data: { data: settings } } = await axios.get(endpoint, config);
        localStorage.setItem('settings', JSON.stringify(settings));
        commit('setSettings', settings);
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
    getSurvey: (state) => JSON.parse(state.settings
      .find((setting) => setting.key === 'survey')
      .content),
  },
};

const config = {
  namespaced: true,
};

export default ModuleMaker.Make(template, config);
