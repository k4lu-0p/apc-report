/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
  numeric,
  maxLength,
  integer,
  not,
  minValue,
  requiredIf,
} from 'vuelidate/lib/validators';

const alphaCustom = helpers.regex('alphaCustom', /^[A-Za-z\ç\é\á\ó\ú\í\è\ò\ù\ì\à\ê\î\â\ô\û\'\-\ ]+$/);
const alphaNumCustom = helpers.regex('alphaNumCustom', /^[0-9A-Za-z\ç\é\á\ó\ú\í\è\ò\ù\ì\à\ê\î\â\ô\û\'\-\ ]+$/);

const login = {
  form: {
    email: {
      email,
      required,
    },
    password: {
      required,
    },
  },
};

const appointment = {
  form: {
    start_at: {
      required,
    },
    finish_at: {
      required,
      // eslint-disable-next-line object-shorthand
      isSuperiorStart: function () {
        return this.form.start_at < this.form.finish_at;
      },
    },
    location: {
      required,
    },
    warning: {
      alphaNumCustom,
    },
  },
};

const customer = {
  form: {
    commercial_name: {
      required,
    },
    leader_lastname: {
      required,
    },
    leader_firstname: {
      required,
    },
    address: {
      required,
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
    },
  },
};

const newsletter = {
  form: {
    content: {
      required,
    },
    subject: {
      required,
    },
    // attachement: {
    //   required,
    // },
  },
};

export default {
  login,
  appointment,
  customer,
  newsletter,
};
