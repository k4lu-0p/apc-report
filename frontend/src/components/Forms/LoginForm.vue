<!-- eslint-disable max-len -->
<template>
  <!-- form -->
  <form @submit.prevent="login">

    <!-- fields -->
    <div @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-20 mb-4">
      <div class="mb-4">

        <!-- Label email field -->
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          {{ $t('form.login.email.label') }}
        </label>

        <!-- // Input Email -->
        <input
          :class="{'border-red-500' : emailErrors.length}"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          v-model="$v.form.email.$model"
          @blur="$v.form.email.$touch()"
          :placeholder="$t('form.login.email.label')"
        >

        <!-- // Email error messages -->
        <p
          v-for="(message, index) in emailErrors"
          :key="`email-error-${index}`"
          class="text-red-500 text-xs italic pt-2"
        >
          {{ message }}
        </p>
      </div>
      <div class="mb-6">

        <!-- // Label password field -->
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        {{ $t('form.login.password.label') }}
        </label>

        <!-- // Input Password -->
        <input
          :class="{'border-red-500' : passwordErrors.length}"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          @blur="$v.form.password.$touch()"
          :placeholder="$t('form.login.password.label')"
        >

        <!-- // Password error messages -->
        <p
          v-for="(message, index) in passwordErrors"
          :key="`password-error-${index}`"
          class="text-red-500 text-xs italic pt-2"
        >
          {{ message }}
        </p>

        <!-- // Auth error message -->
        <p class="text-red-500 text-xs italic pt-2" v-if="authStatus === $const.API.STATUS.ERROR">
          {{ $t('form.login.submit.failed') }}
        </p>
      </div>
      <div class="flex items-center justify-center absolute left-1/2 right-1/2">
        <transition mode="out-in">

          <!-- // Spinner loading -->
          <div class="flex" v-if="authStatus === $const.API.STATUS.LOADING || settingsStatus === $const.API.STATUS.LOADING">
            <moon-loader :color="$const.MISC.SPINNER.COLOR"></moon-loader>
          </div>

          <!-- // Submit button -->
          <button
            type="submit"
            v-else
            class="mx-auto bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {{ $t('form.login.submit.label') }}
          </button>

        </transition>
      </div>
    </div>

    <!-- copyright -->
    <p class="text-center text-gray-500 text-xs">
      &copy;{{ $t('misc.copyright') }}
    </p>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import validator from '../../validators';

export default {
  name: 'login-form',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  validations: validator.login,
  methods: {
    login() {
      if (!this.$v.$invalid) {
        // auth
        this.$store.dispatch('authModule/login', this.form).then(() => {
          if (this.authStatus === this.$const.API.STATUS.SUCCESS) {
            // settings
            this.$store.dispatch('settingsModule/fetchSettings').then(() => {
              if (this.settingsStatus === this.$const.API.STATUS.SUCCESS) {
                this.$router.push({ name: this.$const.NAVIGATION.HOME_INDEX.NAME });
              }
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      authStatus: 'authModule/authStatus',
      settingsStatus: 'settingsModule/getStatus',
    }),
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      if (!this.$v.form.email.email) errors.push(this.$t('form.login.email.validations.email'));
      if (!this.$v.form.email.required) errors.push(this.$t('form.login.email.validations.required'));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      if (!this.$v.form.password.required) errors.push(this.$t('form.login.password.validations.required'));
      return errors;
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
