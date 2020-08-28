import axios from 'axios';
import $const from '../constants';

export async function list({ commit, rootState }, params) {
  const { authModule: { token } } = rootState;

  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.FETCH_REPORTS}`;

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
}

export async function update({ commit, rootState }, payload) {
  commit('setReports', []);

  const { id, responses } = payload;
  const { authModule: { token } } = rootState;
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.UPDATE_REPORT}${id}`;
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
}

export default {
  list,
  update,
};
