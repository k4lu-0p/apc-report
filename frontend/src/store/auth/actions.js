import axios from 'axios';
import constants from '../../constants';

export default {
  async login({ commit }, payload) {
    const enpoint = `${constants.API.BASE_URL}${constants.API.ENDPOINTS.LOGIN}`;
    try {
      commit('auth_request');
      const { data: { user, token } } = await axios.post(enpoint, payload);
      commit('auth_success', token, user);
      localStorage.setItem('token', token);
    } catch (error) {
      commit('auth_error', error);
      localStorage.removeItem('token');
      console.error(error);
    }
  },
  logout({ commit }) {
    commit('logout');
    localStorage.removeItem('token');
  },
};
