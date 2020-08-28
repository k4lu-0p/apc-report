import axios from 'axios';
import $const from '../constants';

export async function login({ commit }, payload) {
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.LOGIN}`;
  try {
    commit('auth_request');
    const { data: { user, token } } = await axios.post(endpoint, payload);
    commit('auth_success', { token, user });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    commit('auth_error', error);
    localStorage.removeItem('token');
  }
}

export function logout({ commit }) {
  commit('logout');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('settings');
}

export default {
  login,
  logout,
};
