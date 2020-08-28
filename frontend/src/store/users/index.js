import ModuleMaker from 'vuex-module-maker';
import usersService from '../../services/users';

const template = {
  instructions: {
    status: 'string',
    users: {
      type: 'array',
      initial_value: [],
    },
  },
  actions: { ...usersService },
};

const config = {
  namespaced: true,
};

export default ModuleMaker.Make(template, config);
