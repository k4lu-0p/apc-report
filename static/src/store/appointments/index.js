/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import ModuleMaker from 'vuex-module-maker';
import appointmentsService from '../../services/appointments';

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
    addAppointment: (state, appointment) => {
      state.appointments.push(appointment);
    },
  },
  actions: { ...appointmentsService },
};

const config = {
  namespace: true,
};

export default ModuleMaker.Make(template, config);
