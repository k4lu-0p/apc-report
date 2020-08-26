<template>
<!-- eslint-disable max-len -->
  <form @submit.prevent="onSubmit($event)">
      <!-- header -->
      <div class="flex flex-col justify-center items-center py-12">
        <img src="../../../public/img/bg/2.png" class="header-image" alt="">
      </div>

      <!-- Date start -->
      <div class="datetime-start" :class="[startAtErrors.length > 1 ? 'pb-5' : 'pb-8']">
        <!-- input -->
        <datetime
          zone="local"
          value-zone="local"
          type="datetime"
          input-id="startAt"
          v-model="startAt"
          @blur="$v.form.start_at.$touch()"
          input-class="text-lg appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :phrases="{ok: 'Ok', cancel: 'Annuler'}"
          :title="$t('form.appointment.date.start.label')"
          :placeholder="$t('form.appointment.date.start.placeholder')"
        >
          <!-- slot label -->
          <label
            slot="before"
            for="startAt"
            class="block pb-2 font-semibold text-lg text-gray-800"
          >
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
          input-id="finishAt"
          v-model="finishAt"
          @blur="$v.form.finish_at.$touch()"
          input-class="text-lg appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :phrases="{ok: 'Ok', cancel: 'Annuler'}"
          :title="$t('form.appointment.date.finish.label')"
          :placeholder="$t('form.appointment.date.finish.placeholder')"
          :flow="['time']"
        >

          <!-- slot label -->
          <label
            slot="before"
            class="block pb-2 font-semibold text-gray-800 text-lg"
            for="finishAt"
          >
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

      <!-- Customer commercial_name -->
      <div :class="[commercialNameErrors.length > 1 ? 'pb-5' : 'pb-8']">
        <!-- input -->
        <customer-input
          @clear="handleClearCustomer($event)"
          @select="handleSelectCustomer($event)"
          @new="handleNewCustomer($event)"
          :label="$t('form.customer.commercial_name.label')"
          :placeholder="$t('form.customer.commercial_name.placeholder')"
        ></customer-input>

        <!-- errors -->
        <div :class="{ 'absolute' : commercialNameErrors.length === 1 }">
          <p
            v-for="(message, index) in commercialNameErrors"
            :key="`customer-commercial-name-error-${index}`"
            class="text-red-500 text-xs font-medium pt-2"
          >
            {{ message }}
          </p>
        </div>
      </div>

      <!-- CUSTOMER CREATE FIELDS -->
      <transition
        mode="out-in"
        enter-active-class="animated bounceInRight faster"
        leave-active-class="animated bounceOutLeft faster"
      >
        <div v-if="isCreateCustomerFieldsVisible">
          <!-- Customer leader_lastname  -->
          <div :class="[leaderLastnameErrors.length > 1 ? 'pb-5' : 'pb-8']">
            <!-- label -->
            <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
              {{ $t('form.customer.leader_lastname.label') }}
              <span class="text-red-500">*</span>
            </label>

            <!-- input -->
            <input
              class="text-lg appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name=""
              id="warning"
              type="text"
              :placeholder="$t('form.customer.leader_lastname.placeholder')"
              @blur="$v.form.customer.leader_lastname.$touch()"
              v-model="$v.form.customer.leader_lastname.$model"
            />

            <!-- errors -->
            <div :class="{'absolute' : leaderLastnameErrors.length === 1}">
              <p
                v-for="(message, index) in leaderLastnameErrors"
                :key="`warning-error-${index}`"
                class="text-red-500 text-xs font-medium pt-2"
              >
                {{ message }}
              </p>
            </div>
          </div>

          <!-- Customer leader_firstname  -->
          <div :class="[leaderFirstnameErrors.length > 1 ? 'pb-5' : 'pb-8']">
            <!-- label -->
            <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
              {{ $t('form.customer.leader_firstname.label') }}
              <span class="text-red-500">*</span>
            </label>

            <!-- input -->
            <input
              class="text-lg appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name=""
              id="warning"
              type="text"
              :placeholder="$t('form.customer.leader_firstname.placeholder')"
              @blur="$v.form.customer.leader_firstname.$touch()"
              v-model="$v.form.customer.leader_firstname.$model"
            />

            <!-- errors -->
            <div :class="{'absolute' : leaderFirstnameErrors.length === 1}">
              <p
                v-for="(message, index) in leaderFirstnameErrors"
                :key="`warning-error-${index}`"
                class="text-red-500 text-xs font-medium pt-2"
              >
                {{ message }}
              </p>
            </div>
          </div>

          <!-- Customer adresse  -->
          <div :class="[leaderFirstnameErrors.length > 1 ? 'pb-5' : 'pb-8']">
            <!-- input et label -->
            <here-input
              @clear="handleClearAddress($event)"
              @onClickLocation="handleSelectAddress($event)"
              :label="$t('form.customer.address.label')"
              :placeholder="$t('form.customer.address.placeholder')"
            ></here-input>

            <!-- errors -->
            <div :class="{'absolute' : addressErrors.length === 1}">
              <p
                v-for="(message, index) in addressErrors"
                :key="`warning-error-${index}`"
                class="text-red-500 text-xs font-medium pt-2"
              >
                {{ message }}
              </p>
            </div>
          </div>

          <!-- Customer email  -->
          <div :class="[emailErrors.length > 1 ? 'pb-5' : 'pb-8']">
            <!-- label -->
            <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
              {{ $t('form.customer.email.label') }}
              <span class="text-red-500">*</span>
            </label>

            <!-- input -->
            <input
              class="text-lg appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name=""
              id="warning"
              type="email"
              :placeholder="$t('form.customer.email.placeholder')"
              @blur="$v.form.customer.email.$touch()"
              v-model="$v.form.customer.email.$model"
            />

            <!-- errors -->
            <div :class="{'absolute' : emailErrors.length === 1}">
              <p
                v-for="(message, index) in emailErrors"
                :key="`warning-error-${index}`"
                class="text-red-500 text-xs font-medium pt-2"
              >
                {{ message }}
              </p>
            </div>
          </div>

          <!-- Customer phone  -->
          <div :class="[phoneErrors.length > 1 ? 'pb-5' : 'pb-8']">
            <!-- label -->
            <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
              {{ $t('form.customer.phone.label') }}
              <span class="text-red-500">*</span>
            </label>

            <!-- input -->
            <input
              class="text-lg appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name=""
              id="warning"
              type="tel"
              :placeholder="$t('form.customer.phone.placeholder')"
              @blur="$v.form.customer.phone.$touch()"
              v-model="$v.form.customer.phone.$model"
            />

            <!-- errors -->
            <div :class="{'absolute' : phoneErrors.length === 1}">
              <p
                v-for="(message, index) in phoneErrors"
                :key="`warning-error-${index}`"
                class="text-red-500 text-xs font-medium pt-2"
              >
                {{ message }}
              </p>
            </div>
          </div>
        </div>
      </transition>

      <!-- Warning -->
      <div :class="[warningErrors.length > 1 ? 'pb-5' : 'pb-8']">
        <!-- label -->
        <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
          {{ $t('form.appointment.warning.label') }}
        </label>

        <!-- input -->
        <textarea
          class="text-lg appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name=""
          id="warning"
          rows="5"
          :placeholder="$t('form.appointment.warning.placeholder')"
          @blur="$v.form.warning.$touch()"
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
            :class="[this.$v.$invalid ? 'bg-gray-400' : ' bg-yellow-750']"
            class="text-lg mx-auto hover:bg-yellow-750 w-full text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {{ $t('form.appointment.submit.label') }}
          </button>
        </transition>
      </div>
  </form>
</template>

<script>
/* eslint-disable camelcase */

import HereInput from '../Inputs/HereInput.vue';
import CustomerInput from '../Inputs/CustomerInput.vue';
import validator from '../../validators';

import {
  appointmentValidationMessages,
  customerValidationMessages,
} from '../../mixins/formValidationMessages';

export default {
  name: 'create-appointment-form',
  mixins: [
    appointmentValidationMessages,
    customerValidationMessages,
  ],
  components: {
    HereInput,
    CustomerInput,
  },
  data() {
    return {
      hasNoResultCustomerSearched: false,
      isCreateCustomerFieldsVisible: false,
      form: {
        start_at: null,
        finish_at: null,
        location: null,
        customer: {
          id: 0,
          commercial_name: '',
          leader_lastname: '',
          leader_firstname: '',
          address: null,
          email: '',
          phone: '',
        },
        title: '',
        warning: '',
      },
    };
  },
  validations() {
    return {
      form: {
        ...validator.appointment.form,
        customer: validator.customer.form,
      },
    };
  },
  methods: {
    handleSelectLocation(location) {
      this.form.location = JSON.stringify(location);
    },
    handleSelectAddress(location) {
      this.form.customer.address = JSON.stringify(location);
    },
    handleSelectCustomer(customer) {
      this.isCreateCustomerFieldsVisible = false;
      this.form.customer = customer;
    },
    handleClearCustomer() {
      this.isCreateCustomerFieldsVisible = false;
      this.$v.form.customer.commercial_name.$touch();
      this.form.customer = {
        id: 0,
        commercial_name: '',
        leader_lastname: '',
        leader_firstname: '',
        address: null,
        email: '',
        phone: '',
      };
    },
    handleClearLocation() {
      this.$v.form.location.$touch();
      this.form.location = null;
    },
    handleClearAddress() {
      this.$v.form.customer.address.$touch();
      this.form.customer.address = null;
    },
    // trigger quand on choisi de créer un partenaire dans l'input customer
    handleNewCustomer({ id, commercial_name }) {
      this.form.customer.id = id;
      this.form.customer.commercial_name = commercial_name;
      this.isCreateCustomerFieldsVisible = true;
    },
    onSubmit() {
      this.$emit('submit', this.form);
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
    border-color theme('borderColor.purple.800')
    border-top none
    border-left none
    border-right none

// Theming datepicker
.datetime-start, .datetime-finish
  .vdatetime-time-picker__item--selected
    color theme('colors.purple.800')
  .vdatetime-month-picker__item--selected
    color theme('colors.purple.800')
  .vdatetime-popup__actions__button
    color theme('colors.purple.800')
  .vdatetime-calendar__month__day--selected:hover > span > span
    background theme('colors.purple.800')
  .vdatetime-calendar__month__day--selected > span > span
    background theme('colors.purple.800')
  .vdatetime-popup__header
    background theme('colors.purple.800')

.header-image
  height 120px
</style>
