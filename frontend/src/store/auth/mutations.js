import constants from '../../constants';

export default {
  auth_request(state) {
    state.status = constants.API.STATUS.LOADING;
  },
  auth_success(state, payload) {
    state.status = constants.API.STATUS.SUCCESS;
    state.token = payload.token;
    state.user = payload.user;
  },
  auth_error(state) {
    state.status = constants.API.STATUS.ERROR;
  },
  logout(state) {
    state.status = '';
    state.token = '';
  },
};
