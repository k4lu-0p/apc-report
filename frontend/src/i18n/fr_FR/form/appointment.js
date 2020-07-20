export default {
  header: {
    title: 'Créer un rendez-vous',
  },
  date: {
    start: {
      label: 'Début du rendez-vous :',
      placeholder: 'Selectionner la date et l\'heure',
      validations: {
        required: 'La date de début est obligatoire.',
      },
    },
    finish: {
      label: 'Fin du rendez-vous :',
      placeholder: 'Selectionner la date et l\'heure',
      validations: {
        required: 'La date de fin est obligatoire.',
        isSuperiorStart: 'La date de fin doit être supérieur à la date de début.',
      },
    },
  },
  location: {
    label: 'Lieu du rendez-vous :',
    placeholder: 'Rechercher le lieu',
    validations: {
      required: 'Le lieu est obligatoire.',
    },
  },
  customer: {
    label: 'Client :',
    placeholder: 'Rechercher le client',
    validations: {
      required: 'La selection d\'un client est obligatoire.',
      integer: 'La selection d\'un client est obligatoire.',
      isValidId: 'La selection d\'un client est obligatoire.',
    },
  },
  title: {
    label: 'Titre du rendez-vous :',
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
