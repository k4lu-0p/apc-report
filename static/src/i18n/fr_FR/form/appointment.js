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
  warning: {
    label: 'Avertissement :',
    placeholder: 'Définir un message d\'avertissement supplémentaire pour le rendez-vous. (optionnel)',
    validations: {
      alphaNumCustom: 'Le champ contient des caractères interdits.',
    },
  },
  submit: {
    label: 'Enregistrer le RDV',
  },
};
