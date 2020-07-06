import ModuleMaker from 'vuex-module-maker';
import axios from 'axios';
import $const from '../../constants';

const template = {
  instructions: {
    reports: {
      type: 'object',
      // initial_value: JSON.parse(localStorage.getItem('reports')) || '',
      initial_value: '',
    },
  },
  actions: {
    fetchReports: async ({ commit, rootState }) => {
      const { authModule: { token } } = rootState;
      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.FETCH_REPORTS}`;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data: reports } = await axios.get(endpoint, config);
      localStorage.setItem('reports', JSON.stringify(reports));
      commit('setReports', reports);
    },
  },
};

const config = {
  namespaced: true,
};

export default ModuleMaker.Make(template, config);
