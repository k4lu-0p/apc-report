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
} from 'vuelidate/lib/validators';

// import { ValidationRuleset } from 'vuelidate';
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

export default {
  login,
};
