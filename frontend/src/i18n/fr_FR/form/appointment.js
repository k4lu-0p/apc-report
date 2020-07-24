export default {
  header: {
    title: 'Nouveau rendez-vous',
  },
  date: {
    start: {
      label: 'Début :',
      placeholder: 'Selectionner la date et l\'heure',
      validations: {
        required: 'La date de début est obligatoire.',
      },
    },
    finish: {
      label: 'Fin :',
      placeholder: 'Selectionner la date et l\'heure',
      validations: {
        required: 'La date de fin est obligatoire.',
        isSuperiorStart: 'La date de fin doit être supérieur à la date de début.',
      },
    },
  },
  location: {
    label: 'Lieu :',
    placeholder: 'Rechercher le lieu',
    validations: {
      required: 'Le lieu est obligatoire.',
    },
  },
  customer: {
    label: 'Partenaire :',
    placeholder: 'Rechercher un partenaire',
    validations: {
      required: 'La selection d\'un partenaire est obligatoire.',
      integer: 'La selection d\'un partenaire est obligatoire.',
      isValidId: 'La selection d\'un partenaire est obligatoire.',
    },
    errors: {
      result: 'Aucun partenaires n\'a été trouvé.',
    },
  },
  title: {
    label: 'Titre :',
    placeholder: 'Définir un titre',
    validations: {
      required: 'Le titre est obligatoire.',
      minLength: 'Le titre doit contenir au minimum 5 caractères.',
      maxLength: 'Le titre ne doit pas dépasser 80 caractères.',
    },
  },
  warning: {
    label: 'Avertissement :',
    placeholder: 'Définir un message d\'avertissement supplémentaire (optionnel).',
    validations: {
      alphaNumCustom: 'Le champ contient des caractères interdits.',
    },
  },
  submit: {
    label: 'Enregistrer le RDV',
  },
};
