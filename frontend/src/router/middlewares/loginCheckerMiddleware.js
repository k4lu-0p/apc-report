// middleware : loginCheckerMiddleware

import store from '../../store';

import $const from '../../constants';

export default (to, from, next) => {
  // empêche de revenir sur la page de login si on est déjà authentifié.
  if (to.name === $const.NAVIGATION.LOGIN_PAGE.NAME) {
    console.log('coucou');
    if (store.getters['authModule/isLoggedIn']) {
      next({ name: $const.NAVIGATION.HOME_PAGE.NAME });
    } else {
      next();
    }
  }

  // empêche d'accèder aux pages de l'app si on est pas authentifié.
  // on vérifie si la méta requiresAuth est présente.
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
