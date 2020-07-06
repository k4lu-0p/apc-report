import constants from '../../constants';

export default {
  auth_request(state) {
    state.status = constants.API.STATUS.LOADING;
  },
  auth_success(state, token, user) {
    state.status = constants.API.STATUS.SUCCESS;
    state.token = token;
    state.user = user;
  },
  auth_error(state) {
    state.status = constants.API.STATUS.ERROR;
  },
  logout(state) {
    state.status = '';
    state.token = '';
  },
};
