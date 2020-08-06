export default {
  commercial_name: {
    label: 'Partenaire :',
    placeholder: 'Rechercher ou créer',
    validations: {
      required: 'La selection d\'un partenaire est obligatoire.',
      integer: 'La selection d\'un partenaire est obligatoire.',
      isValidId: 'La selection d\'un partenaire est obligatoire.',
    },
    errors: {
      result: 'Aucun partenaires n\'a été trouvé.',
    },
  },
  leader_lastname: {
    label: 'Nom du dirigeant :',
    placeholder: 'Saisir le nom du dirigeant',
    validations: {
      required: 'Le nom du dirigeant est obligatoire.',
    },
  },
  leader_firstname: {
    label: 'Prénom du dirigeant :',
    placeholder: 'Saisir le prénom du dirigeant',
    validations: {
      required: 'Le prénom du dirigeant est obligatoire.',
    },
  },
  address: {
    label: 'Adresse :',
    placeholder: 'Rechercher l\'adresse',
    validations: {
      required: 'L\'adresse obligatoire.',
    },
  },
  email: {
    label: 'Email :',
    placeholder: 'Saisir l\'adresse email',
    validations: {
      required: 'L\'adresse email est obligatoire.',
      email: 'Format de l\'adresse email incorrect.',
    },
  },
  phone: {
    label: 'Téléphone :',
    placeholder: 'Saisir un numéro de téléphone',
    validations: {
      required: 'Un numéro de téléphone est obligatoire.',
    },
  },
};
