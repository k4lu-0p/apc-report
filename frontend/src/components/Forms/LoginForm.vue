<!-- eslint-disable max-len -->
<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">

    <!-- // Login form -->
    <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-20 mb-4">
      <div class="mb-4">

        <!-- Label email field -->
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          {{ $t('form.email.label') }}
        </label>

        <!-- // Input Email -->
        <input
          :class="{'border-red-500' : emailErrors.length}"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          v-model="$v.form.email.$model"
          @blur="$v.form.email.touch()"
          :placeholder="$t('form.email.label')"
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
        {{ $t('form.password.label') }}
        </label>

        <!-- // Input Password -->
        <input
          :class="{'border-red-500' : passwordErrors.length}"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          @blur="$v.form.password.touch()"
          :placeholder="$t('form.password.label')"
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
          {{ $t('form.login.failed') }}
        </p>
      </div>
      <div class="flex items-center justify-center absolute left-1/2 right-1/2">
        <transition mode="out-in">

          <!-- // Spinner loading -->
          <div class="flex" v-if="authStatus === $const.API.STATUS.LOADING">
            <moon-loader :color="$const.MISC.SPINNER.COLOR"></moon-loader>
          </div>

          <!-- // Submit button -->
          <button
            type="submit"
            v-else
            class="mx-auto bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {{ $t('form.login.label') }}
          </button>

        </transition>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2020 Lucas R. All rights reserved.
    </p>
  </div>
</template>

<script lang="ts">
import $const from '../../constants';
import { authModule } from '../../store/auth-module';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Validations } from 'vuelidate-property-decorators';
import validator from '../../validators';
import { validationMixin } from 'vuelidate'

@Component
export default class LoginForm extends Vue {
  form: object = {
    email: '',
    password: '',
  }

  mounted() {
    console.log(this.$v);
  }

  validations() {
    return validator.login;
  }

  get authStatus(): string {
    return authModule.authStatus;
  }

  get emailErrors(): Array<string> {
    const errors: Array<any> = [];
    if (!this.$v.form.email.$dirty) return errors;
    if (!this.$v.form.email.email) errors.push(this.$t('form.email.validations.email'));
    if (!this.$v.form.email.required) errors.push(this.$t('form.email.validations.required'));
    return errors;
  }

  get passwordErrors(): Array<string> {
    const errors: Array<any> = [];
    if (!this.$v.form.password.$dirty) return errors;
    if (!this.$v.form.password.required) errors.push(this.$t('form.password.validations.required'));
    return errors;
  }

  private login(): void {
    if (!this.$v.$invalid) {
      authModule.login(this.form).then(() => {
        if (authModule.authStatus === $const.API.STATUS.SUCCESS) {
          this.$router.push('/');
        }
      });
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
