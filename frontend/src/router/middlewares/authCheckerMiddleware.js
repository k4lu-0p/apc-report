// middleware : loginCheckerMiddleware

import store from '../../store';

import $const from '../../constants';

// empêche d'accèder aux pages de l'app si on est pas authentifié.
// on vérifie si la méta requiresAuth est présente.
const beforeEach = (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['authModule/isLoggedIn']) {
      next();
    } else {
      next($const.NAVIGATION.LOGIN_PAGE.PATH);
    }
  } else {
    next();
  }
};

// empêche d'accèder à l'écran de login si on est déjà authentifié.
const beforeLoginEnter = (to, from, next) => {
  if (store.getters['authModule/isLoggedIn']) {
    next('/');
  } else {
    next();
  }
};

export default {
  beforeEach,
  beforeLoginEnter,
};
