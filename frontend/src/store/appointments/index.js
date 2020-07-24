/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import ModuleMaker from 'vuex-module-maker';
import axios from 'axios';
import $const from '../../constants';

const template = {
  instructions: {
    status: 'string',
    appointments: {
      type: 'array',
      // initial_value: JSON.parse(localStorage.getItem('appointments')) || [],
      initial_value: [],
    },
  },
  mutations: {
    addAppointment: (state, appointment) => appointment.id > 0 && state.appointments.push(appointment),
  },
  actions: {
    fetchAppointments: async ({ commit, rootState }) => {
      const { authModule: { token } } = rootState;
      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.FETCH_APPOINTMENTS}`;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        commit('setStatus', $const.API.STATUS.LOADING);
        const { data: { data: appointments } } = await axios.get(endpoint, config);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        commit('setAppointments', appointments);
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
    storeAppointment: async ({ commit, rootState }, formData) => {
      const { authModule: { token } } = rootState;
      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.STORE_APPOINTMENT}`;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        commit('setStatus', $const.API.STATUS.LOADING);
        const { data: { appointment } } = await axios.post(endpoint, formData, config);
        commit('addAppointment', appointment);
        commit('reportsModule/addReport', appointment.report, { root: true });
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
  namespace: true,
};

export default ModuleMaker.Make(template, config);
