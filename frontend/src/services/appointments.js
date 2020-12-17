import axios from 'axios';
import $const from '../constants';

export async function list({ commit, rootState }, params) {
  const { authModule: { token } } = rootState;
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.API_ENDPOINTS.FETCH_APPOINTMENTS}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  };

  try {
    commit('setStatus', $const.API.STATUS.LOADING);

    const { data: { data: appointments } } = await axios.get(endpoint, config);

    appointments.forEach((appointment) => {
      commit('addAppointment', appointment);
    });

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

export async function create({ commit, rootState }, formData) {
  // clean for force reload with the new
  commit('setAppointments', []);

  const { authModule: { token } } = rootState;
  let newAppointment = null;
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.API_ENDPOINTS.STORE_APPOINTMENT}`;
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
}

export async function remove({ commit, rootState }, id) {
  const { authModule: { token } } = rootState;
  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.API_ENDPOINTS.DELETE_APPOINTMENT}${id}`;
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
  const { authModule: { token } } = rootState;
  const { id, formData } = payload;
  let newAppointment;

  const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.API_ENDPOINTS.UPDATE_APPOINTMENT}${id}`;
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
}

export default {
  list,
  create,
  remove,
  update,
};
