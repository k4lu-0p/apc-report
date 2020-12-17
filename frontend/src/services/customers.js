import axios from 'axios';
import $const from '../constants';

export async function list({ commit, rootState }, params) {
  const { authModule: { token } } = rootState;
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.API_ENDPOINTS.FETCH_CUSTOMERS}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  };

  try {
    commit('setStatus', $const.API.STATUS.LOADING);
    const { data: { data: customers } } = await axios.get(endpoint, config);
    commit('setCustomers', customers);
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

export async function remove({ commit, rootState }, id) {
  const { authModule: { token } } = rootState;
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.API_ENDPOINTS.DELETE_CUSTOMER}${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    commit('setStatus', $const.API.STATUS.LOADING);
    await axios.delete(endpoint, config);
    commit('setStatus', $const.API.STATUS.SUCCESS);
  } catch (error) {
    commit('setStatus', $const.API.STATUS.ERROR);
    throw error;
  }
}

export async function update({ commit, rootState }, payload) {
  commit('setCustomers', []);

  const { id, formData } = payload;
  const { authModule: { token } } = rootState;
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.API_ENDPOINTS.UPDATE_CUSTOMER}${id}`;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    commit('setStatus', $const.API.STATUS.LOADING);
    await axios.put(endpoint, formData, config);
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
  remove,
  update,
};
