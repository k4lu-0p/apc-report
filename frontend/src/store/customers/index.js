import ModuleMaker from 'vuex-module-maker';
import axios from 'axios';
import $const from '../../constants';

const template = {
  instructions: {
    status: 'string',
    customers: {
      type: 'array',
      initial_value: [],
    },
  },
  actions: {
    fetchCustomers: async ({ commit, rootState }, params) => {
      const { authModule: { token } } = rootState;

      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.FETCH_CUSTOMERS}`;

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
    },
    deleteCustomer: async ({ commit, rootState }, id) => {
      const { authModule: { token } } = rootState;
      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.DELETE_CUSTOMER}${id}`;
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
    },
    putCustomer: async ({ commit, rootState }, payload) => {
      commit('setCustomers', []);

      const { id, formData } = payload;
      const { authModule: { token } } = rootState;
      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.UPDATE_CUSTOMER}${id}`;
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
    },
  },
};

const config = {
  namespaced: true,
};

export default ModuleMaker.Make(template, config);
