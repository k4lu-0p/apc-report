import ModuleMaker from 'vuex-module-maker';
import reportsService from '../../services/reports';

const template = {
  instructions: {
    status: 'string',
    reports: {
      type: 'array',
      // initial_value: JSON.parse(localStorage.getItem('reports')) || [],
      initial_value: [],
    },
  },
  actions: { ...reportsService },
  getters: {
    getReportById: (state) => (id) => state.reports.find((report) => report.id === id),
    getLastReport: (state) => state.reports[state.reports.length - 1],
  },
  mutations: {
    removeReport: (state, id) => {
      state.reports = state.reports.filter((report) => report.id !== id);
    },
  },
};

const config = {
  namespaced: true,
};

export default ModuleMaker.Make(template, config);
