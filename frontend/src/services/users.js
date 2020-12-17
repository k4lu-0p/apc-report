import axios from 'axios';
import $const from '../constants';

export async function list({ commit, rootState }, params) {
  const { authModule: { token } } = rootState;
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.API_ENDPOINTS.FETCH_USERS}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  };

  try {
    commit('setStatus', $const.API.STATUS.LOADING);
    const { data: { data: users } } = await axios.get(endpoint, config);
    commit('setUsers', users);
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
