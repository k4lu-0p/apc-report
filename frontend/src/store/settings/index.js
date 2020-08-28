import ModuleMaker from 'vuex-module-maker';
import settingsService from '../../services/settings';

const template = {
  instructions: {
    status: 'string',
    settings: {
      type: 'array',
      initial_value: JSON.parse(localStorage.getItem('settings')) || [],
      // initial_value: [],
    },
  },
  actions: { ...settingsService },
  getters: {
    getSurvey: (state) => JSON.parse(state.settings
      .find((setting) => setting.key === 'survey')
      .content),
  },
};

const config = {
  namespaced: true,
};

export default ModuleMaker.Make(template, config);
