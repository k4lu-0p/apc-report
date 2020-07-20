export default {
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
};
