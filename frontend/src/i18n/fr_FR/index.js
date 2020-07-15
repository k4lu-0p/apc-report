export default {
  lang: 'fr',
  form: {
    firstname: {
      label: 'Prénom',
    },
    lastname: {
      label: 'Nom',
    },
    email: {
      label: 'E-mail',
      validations: {
        required: 'Adresse mail obligatoire.',
        email: 'Doit-être une adresse mail valide.',
      },
    },
    password: {
      label: 'Mot de passe',
      validations: {
        required: 'Mot de passe obligatoire.',
      },
    },
    submit: {
      label: 'Envoyer',
    },
    login: {
      label: 'Connexion',
      failed: 'Échec de l\'authentification.',
    },
    logout: {
      label: 'Déconnexion',
    },
  },
  tabsNavigator: {
    home: 'Accueil',
    reports: 'Rapports',
    support: 'Support',
    customers: 'Clients',
    settings: 'Paramètres',
    appointments: 'Rendez-vous',
  },
};
