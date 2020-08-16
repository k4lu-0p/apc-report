/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import ModuleMaker from 'vuex-module-maker';
import axios from 'axios';
import $const from '../../constants';

const template = {
  instructions: {
    status: 'string',
    items: {
      type: 'array',
      // initial_value: JSON.parse(localStorage.getItem('appointments')) || [],
      initial_value: [],
    },
  },
  actions: {
    list: async ({ commit, rootState }, params) => {
      const { authModule: { token } } = rootState;

      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.FETCH_APPOINTMENTS}`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      };

      try {
        commit('setStatus', $const.API.STATUS.LOADING);

        const { data: { data: appointments } } = await axios.get(endpoint, config);
        commit('seItems', appointments);

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
    create: async ({ commit, rootState }, formData) => {
      // clean for force reload with the new
      commit('setAppointments', []);

      const { authModule: { token } } = rootState;
      let newAppointment = null;
      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.STORE_APPOINTMENT}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        commit('setStatus', $const.API.STATUS.LOADING);
        const { data: { appointment } } = await axios.post(endpoint, formData, config);
        newAppointment = appointment;
        commit('setStatus', $const.API.STATUS.SUCCESS);
        return appointment;
      } catch (error) {
        commit('setStatus', $const.API.STATUS.ERROR);
        if (error.response) {
          if (error.response.status === 401) {
            commit('setStatus', $const.API.STATUS.UNAUTHORIZED);
          }
        }
      }
      return newAppointment;
    },
    delete: async ({ commit, rootState }, id) => {
      const { authModule: { token } } = rootState;
      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.DELETE_APPOINTMENT}${id}`;
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
    update: async ({ commit, rootState }, payload) => {
      const { authModule: { token } } = rootState;
      const { id, formData } = payload;
      let newAppointment;

      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.UPDATE_APPOINTMENT}${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        commit('setStatus', $const.API.STATUS.LOADING);
        const { data: { appointment } } = await axios.put(endpoint, formData, config);
        newAppointment = appointment;
        commit('setStatus', $const.API.STATUS.SUCCESS);
      } catch (error) {
        commit('setStatus', $const.API.STATUS.ERROR);
        throw error;
      }

      return newAppointment;
    },
  },
};

const config = {
  namespace: true,
};

export default ModuleMaker.Make(template, config);
