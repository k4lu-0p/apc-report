import ModuleMaker from 'vuex-module-maker';
import customersService from '../../services/customers';

const template = {
  instructions: {
    status: 'string',
    customers: {
      type: 'array',
      initial_value: [],
    },
  },
  actions: { ...customersService },
};

const config = {
  namespaced: true,
};

export default ModuleMaker.Make(template, config);
