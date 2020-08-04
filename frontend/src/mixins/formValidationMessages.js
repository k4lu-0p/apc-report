/* eslint-disable curly */
export const createAppointment = {
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
    customerErrors() {
      const errors = [];
      if (!this.$v.form.customer_name.$dirty) return errors;
      if (!this.$v.form.customer_name.required) errors.push(this.$t('form.appointment.customer.validations.required'));
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

export default {
  createAppointment,
};
