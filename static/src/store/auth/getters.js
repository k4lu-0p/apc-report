export default {
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  getUser: (state) => state.user,
  getToken: (state) => state.token,
  getUserRole: (state) => state.user.roles[0],
  // admin feature
  hasSwitchedAccount: (state) => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    if (userStorage.name !== state.user.name) {
      return true;
    }
    return false;
  },
};
