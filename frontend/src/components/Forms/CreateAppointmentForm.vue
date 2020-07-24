<template>
<!-- eslint-disable max-len -->
  <div class="container mx-auto px-8">
    <div class="flex flex-col justify-center items-center py-12">
      <img src="../../../public/img/bg/2.png" class="header-image" alt="">
      <h2 class="font-bold text-2xl text-gray-800">
        {{ $t('form.appointment.header.title') }}
      </h2>
    </div>
    <form @submit.prevent="onSubmit($event)">
      <!-- Date start -->
      <div class="datetime-start" :class="[startAtErrors.length > 1 ? 'pb-5' : 'pb-8']">
        <!-- input -->
        <datetime
          zone="local"
          value-zone="local"
          type="datetime"
          input-id="dateStart"
          v-model="startAt"
          @blur="$v.form.start_at.$touch()"
          input-class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :phrases="{ok: 'Ok', cancel: 'Annuler'}"
          :title="$t('form.appointment.date.start.label')"
          :placeholder="$t('form.appointment.date.start.placeholder')"
        >
          <!-- label -->
          <label class="block pb-2 font-semibold text-lg text-gray-800" for="dateStart" slot="before">
            {{ $t('form.appointment.date.start.label') }}
            <span class="text-red-500">*</span>
          </label>
        </datetime>

        <!-- errors -->
        <div :class="{'absolute' : startAtErrors.length === 1}">
          <p
            v-for="(message, index) in startAtErrors"
            :key="`date-start-error-${index}`"
            class="text-red-500 text-xs font-medium pt-2"
          >
            {{ message }}
          </p>
        </div>
      </div>

      <!-- Date end -->
      <div class="datetime-finish" :class="[finishAtErrors.length > 1 ? 'pb-5' : 'pb-8']">
        <!-- input -->
        <datetime
          zone="local"
          value-zone="local"
          type="datetime"
          input-id="dateFinish"
          v-model="finishAt"
          @blur="$v.form.finish_at.$touch()"
          input-class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :phrases="{ok: 'Ok', cancel: 'Annuler'}"
          :title="$t('form.appointment.date.finish.label')"
          :placeholder="$t('form.appointment.date.finish.placeholder')"
          :flow="['time']"
        >
          <!-- label -->
          <label class="block pb-2 font-semibold text-gray-800 text-lg" for="dateFinish" slot="before">
             {{ $t('form.appointment.date.finish.label') }}
             <span class="text-red-500">*</span>
          </label>
        </datetime>

        <!-- errors -->
        <div :class="{'absolute' : finishAtErrors.length === 1}">
          <p
            v-for="(message, index) in finishAtErrors"
            :key="`date-finish-error-${index}`"
            class="text-red-500 text-xs font-medium pt-2"
          >
            {{ message }}
          </p>
        </div>
      </div>

      <!-- Location -->
      <div :class="[locationErrors.length > 1 ? 'pb-5' : 'pb-8']">
        <!-- input -->
        <here-input
          @clear="handleClearLocation($event)"
          @onClickLocation="handleSelectLocation($event)"
          :label="$t('form.appointment.location.label')"
          :placeholder="$t('form.appointment.location.placeholder')"
        ></here-input>

        <!-- errors -->
        <div :class="{'absolute' : locationErrors.length === 1}">
          <p
            v-for="(message, index) in locationErrors"
            :key="`localisation-error-${index}`"
            class="text-red-500 text-xs font-medium pt-2"
          >
            {{ message }}
          </p>
        </div>
      </div>

      <!-- Customer -->
      <div :class="[customerErrors.length > 1 || hasNoResultCustomerSearched ? 'pb-5' : 'pb-8']">
        <!-- input -->
        <customer-input
          @clear="handleClearCustomer($event)"
          @onClickCustomer="handleSelectCustomer($event)"
          @onNoResult="handleNoResultCustomerSearched($event)"
          :label="$t('form.appointment.customer.label')"
          :placeholder="$t('form.appointment.customer.placeholder')"
        ></customer-input>

        <!-- errors -->
        <div :class="{'absolute' : customerErrors.length === 1 && hasNoResultCustomerSearched == false}">
          <p
            class="text-red-500 font-bold text-xs pt-2"
            v-if="hasNoResultCustomerSearched">
            {{ $t('form.appointment.customer.errors.result') }}
          </p>
          <p
            v-for="(message, index) in customerErrors"
            :key="`customer-error-${index}`"
            class="text-red-500 text-xs font-medium pt-2"
          >
            {{ message }}
          </p>
        </div>
      </div>

      <!-- Title -->
      <div :class="[titleErrors.length > 1 ? 'pb-5' : 'pb-8']">
        <!-- label -->
        <label class="block pb-2 font-semibold text-gray-800 text-lg" for="title">
          {{ $t('form.appointment.title.label') }}
          <span class="text-red-500">*</span>
        </label>

        <!-- input -->
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name=""
          id="title"
          :placeholder="$t('form.appointment.title.placeholder')"
          @blur="$v.form.title.$touch()"
          v-model="$v.form.title.$model"
        >

        <!-- errors -->
        <div :class="{'absolute' : titleErrors.length === 1}">
          <p
            v-for="(message, index) in titleErrors"
            :key="`title-error-${index}`"
            class="text-red-500 text-xs font-medium pt-2"
          >
            {{ message }}
          </p>
        </div>
      </div>

      <!-- Warning -->
      <div :class="[warningErrors.length > 1 ? 'pb-5' : 'pb-8']">
        <!-- label -->
        <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
          {{ $t('form.appointment.warning.label') }}
        </label>

        <!-- input -->
        <textarea
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name=""
          id="warning"
          rows="5"
          :placeholder="$t('form.appointment.warning.placeholder')"
          @blur="$v.form.title.$touch()"
          v-model="$v.form.warning.$model"
        ></textarea>

        <!-- errors -->
        <div :class="{'absolute' : warningErrors.length === 1}">
          <p
            v-for="(message, index) in warningErrors"
            :key="`warning-error-${index}`"
            class="text-red-500 text-xs font-medium pt-2"
          >
            {{ message }}
          </p>
        </div>
      </div>

      <!-- Submit -->
      <div class="pb-8 flex justify-center items-center h-16">
        <transition
          mode="out-in"
          enter-active-class="animated fadeIn faster-x2"
          leave-active-class="animated fadeOut faster-x2"
        >

          <!-- loading -->
          <moon-loader
            v-if="submittingStatus === $const.API.STATUS.LOADING"
            :color="$const.MISC.SPINNER.COLOR"
            class="v-spinner-custom"
          ></moon-loader>

          <!-- submit -->
          <button
            :disabled="this.$v.$invalid"
            v-else
            :class="[this.$v.$invalid ? 'bg-gray-400' : ' bg-teal-600']"
            class="mx-auto hover:bg-teal-800 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {{ $t('form.appointment.submit.label') }}
          </button>
        </transition>
      </div>

    </form>
  </div>
</template>

<script>
import HereInput from '../Inputs/HereInput.vue';
import CustomerInput from '../Inputs/CustomerInput.vue';
import validator from '../../validators';

export default {
  name: 'create-appointment-form',
  components: {
    HereInput,
    CustomerInput,
  },
  data() {
    return {
      hasNoResultCustomerSearched: false,
      form: {
        start_at: null,
        finish_at: null,
        location: null,
        customer_id: 0,
        title: '',
        warning: '',
      },
    };
  },
  validations: validator.appointment,
  methods: {
    handleSelectLocation(location) {
      this.form.location = JSON.stringify(location);
    },
    handleSelectCustomer(customer) {
      this.form.customer_id = customer.id;
    },
    handleClearCustomer() {
      this.$v.form.customer_id.$touch();
      this.form.customer_id = 0;
    },
    handleClearLocation() {
      this.$v.form.location.$touch();
      this.form.location = null;
    },
    onSubmit() {
      this.$emit('submit', this.form);
    },
    handleNoResultCustomerSearched(hasNoResult) {
      this.hasNoResultCustomerSearched = hasNoResult;
    },
  },
  computed: {
    startAt: {
      get() {
        return this.form.start_at;
      },
      set(value) {
        if (value) {
          this.form.start_at = value;
          this.form.finish_at = this.$moment(value)
            .add(1.5, 'hours')
            .format('YYYY-MM-DDTHH:mm:ss.SSSSZ');
        }
      },
    },
    finishAt: {
      get() {
        return this.form.finish_at;
      },
      set(value) {
        this.form.finish_at = value;
      },
    },
    submittingStatus() {
      return this.$store.getters['appointmentsModule/getStatus'];
    },
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
      if (!this.$v.form.customer_id.$dirty) return errors;
      if (!this.$v.form.customer_id.required) errors.push(this.$t('form.appointment.customer.validations.required'));
      if (!this.$v.form.customer_id.isValidId) errors.push(this.$t('form.appointment.customer.validations.isValidId'));
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.form.title.$dirty) return errors;
      if (!this.$v.form.title.required) errors.push(this.$t('form.appointment.title.validations.required'));
      if (!this.$v.form.title.minLength) errors.push(this.$t('form.appointment.title.validations.minLength'));
      if (!this.$v.form.title.maxLength) errors.push(this.$t('form.appointment.title.validations.maxLength'));
      return errors;
    },
    warningErrors() {
      const errors = [];
      if (!this.$v.form.warning.$dirty) return errors;
      if (!this.$v.form.warning.alphaNumCustom) errors.push(this.$t('form.appointment.warning.validations.alphaNumCustom'));
      return errors;
    },
  },
  mounted() {
    this.$store.commit('customersModule/setCustomers', []);
  },
};
</script>

<style lang="stylus">
.input-form
    @apply appearance-none border
    @apply w-full px-0 py-2 text-gray-700
    @apply leading-tight
    border-width theme('borderWidth.default')
    border-color theme('borderColor.teal.600')
    border-top none
    border-left none
    border-right none

// Theming datepicker
.datetime-start, .datetime-finish
  .vdatetime-time-picker__item--selected
    color theme('colors.teal.600')
  .vdatetime-month-picker__item--selected
    color theme('colors.teal.600')
  .vdatetime-popup__actions__button
    color theme('colors.teal.600')
  .vdatetime-calendar__month__day--selected:hover > span > span
    background theme('colors.teal.600')
  .vdatetime-calendar__month__day--selected > span > span
    background theme('colors.teal.600')
  .vdatetime-popup__header
    background theme('colors.teal.600')

.header-image
  height 120px
</style>
