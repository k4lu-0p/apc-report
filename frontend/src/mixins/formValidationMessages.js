/* eslint-disable curly */
export const appointmentValidationMessages = {
  computed: {
    startAtErrors() {
      const errors = [];
      if (!this.$v.form.start_at.$dirty) return errors;
      if (!this.$v.form.start_at.required) errors.push(this.$t('form.appointment.date.start.validations.required'));
      return errors;
    },
    finishAtErrors() {
      const errors = [];
      if (!this.$v.form.finish_at.$dirty) return errors;
      if (!this.$v.form.finish_at.required) errors.push(this.$t('form.appointment.date.finish.validations.required'));
      if (!this.$v.form.finish_at.isSuperiorStart) errors.push(this.$t('form.appointment.date.finish.validations.isSuperiorStart'));
      return errors;
    },
    locationErrors() {
      const errors = [];
      if (!this.$v.form.location.$dirty) return errors;
      if (!this.$v.form.location.required) errors.push(this.$t('form.appointment.location.validations.required'));
      return errors;
    },
    warningErrors() {
      const errors = [];
      if (!this.$v.form.warning.$dirty) return errors;
      if (!this.$v.form.warning.alphaNumCustom) errors.push(this.$t('form.appointment.warning.validations.alphaNumCustom'));
      return errors;
    },
  },
};

export const customerValidationMessages = {
  computed: {
    commercialNameErrors() {
      const errors = [];
      if (!this.$v.form.customer.commercial_name.$dirty) return errors;
      if (!this.$v.form.customer.commercial_name.required) errors.push(this.$t('form.customer.commercial_name.validations.required'));
      return errors;
    },
    leaderLastnameErrors() {
      const errors = [];
      if (!this.$v.form.customer.leader_lastname.$dirty) return errors;
      if (!this.$v.form.customer.leader_lastname.required) errors.push(this.$t('form.customer.leader_lastname.validations.required'));
      return errors;
    },
    leaderFirstnameErrors() {
      const errors = [];
      if (!this.$v.form.customer.leader_firstname.$dirty) return errors;
      if (!this.$v.form.customer.leader_firstname.required) errors.push(this.$t('form.customer.leader_firstname.validations.required'));
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.form.customer.address.$dirty) return errors;
      if (!this.$v.form.customer.address.required) errors.push(this.$t('form.customer.address.validations.required'));
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.customer.email.$dirty) return errors;
      if (!this.$v.form.customer.email.required) errors.push(this.$t('form.customer.email.validations.required'));
      if (!this.$v.form.customer.email.email) errors.push(this.$t('form.customer.email.validations.email'));
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.form.customer.phone.$dirty) return errors;
      if (!this.$v.form.customer.phone.required) errors.push(this.$t('form.customer.phone.validations.required'));
      return errors;
    },
  },
};

export default {
  appointmentValidationMessages,
  customerValidationMessages,
};
