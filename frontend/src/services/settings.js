import axios from 'axios';
import $const from '../constants';

export async function list({ commit, rootState }) {
  const { authModule: { token } } = rootState;
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.FETCH_SETTINGS}`;
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
}

export default {
  list,
};
