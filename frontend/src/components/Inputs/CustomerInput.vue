<template>
<!-- eslint-disable max-len -->
  <div>
    <label class="block pb-2 font-semibold text-gray-800 text-lg" for="customer">
      {{ label }}
      <span class="text-red-500">*</span>
    </label>
    <div class="relative appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10 flex justify-between">
      <input
        title="customer"
        class="px-3 bg-transparent absolute h-full w-5/6 left-0 top-0 text-gray-700"
        id="customer"
        type="search"
        v-model="params.value"
        @click="onClearField($event)"
        @keyup="handleKeyUp($event)"
        :placeholder="placeholder"
      >
      <span
        @click="onClickSearchCustomer($event)"
        class="w-1/6 absolute right-0 top-0 h-full flex justify-center items-center"
      >
          <moon-loader
            class="v-spinner-custom"
            v-if="status === $const.API.STATUS.LOADING"
            :color="$const.MISC.SPINNER.COLOR"
          ></moon-loader>
          <magnify-icon v-else class="magnify-icon"></magnify-icon>
      </span>
    </div>
    <transition
      enter-active-class="animated fadeIn faster-x2"
      leave-active-class="animated fadeOut faster-x2"
      mode="out-in"
    >
      <div v-if="customers.length > 0 || params.value.length >= 2">
        <ul class="customers-list">
          <li
            v-if="params.value.length >= 2 && !IsCommercialNameAlreadyExist(params.value) && customerSelected === null"
            @click="onSelectNewCustomer($event)"
            class="py-2 customer-item flex justify-between items-center"
          >
            <span class="w-5/6 h-full" >
              {{ params.value }}
            </span>
            <span class="flex justify-center items-center w-1/6 text-sm">
              créer
            </span>
          </li>
          <li
            @click="onSelectCustomer($event, customer)"
            class="py-2 customer-item flex justify-between items-center"
            v-for="(customer, index) in customers"
            :key="`customer-${index}-${customer.id}`"
          >
            <span class="w-5/6 h-full" >
              {{ customer.commercial_name }}
            </span>
            <span class="flex justify-center items-center w-1/6">
              <add-icon class="add-icon"></add-icon>
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ICONS } from '../../constants';

const { common: { AddIcon, MagnifyIcon } } = ICONS;

export default {
  name: 'customer-input',
  components: {
    AddIcon,
    MagnifyIcon,
  },
  props: {
    label: String,
    placeholder: String,
  },
  data() {
    return {
      params: {
        by: 'commercial_name',
        value: '',
        limit: 4,
        offset: 0,
      },
      customerSelected: null,
      customerFieldsVisible: false,
    };
  },
  methods: {
    handleKeyUp() {
      if (this.status !== this.$const.API.STATUS.LOADING) {
        if (this.params.value.length >= 2) {
          this.$store.dispatch('customersModule/fetchCustomers', this.params);
        }
      }
    },
    onClickSearchCustomer() {
      this.handleKeyUp();
    },
    onSelectCustomer(event, customer) {
      this.customerSelected = customer;
      this.params.value = customer.commercial_name;
      this.$store.commit('customersModule/setCustomers', []);
      this.$emit('select', this.customerSelected);
    },
    onSelectNewCustomer() {
      this.customerSelected = {
        id: 0,
        commercial_name: this.params.value,
      };
      this.$store.commit('customersModule/setCustomers', []);
      this.$emit('new', this.customerSelected);
    },
    onClearField() {
      this.params.value = '';
      this.customerSelected = null;
      this.$emit('clear');
    },
    // permet de savoir si il faut en créer un nouveau ou non
    IsCommercialNameAlreadyExist(search) {
      const commercialNames = this.customers.map(
        (customer) => customer.commercial_name.toLowerCase(),
      );

      if (commercialNames.includes(search.toLowerCase())) {
        return true;
      }
      return false;
    },
  },
  computed: {
    customers() {
      return this.$store.getters['customersModule/getCustomers'];
    },
    status() {
      return this.$store.getters['customersModule/getStatus'];
    },
  },
};
</script>

<style lang="stylus">
.input-form
  @apply appearance-none border
  @apply w-full py-2 px-3 text-gray-700
  @apply leading-tight
  border-width theme('borderWidth.default')
  border-color theme('borderColor.teal.600')
  border-top none
  border-left none
  border-right none

.customers-list
  .customer-item
    @apply border-b text-teal-600
    transition all 0.2s

.v-spinner-custom
  transform scale(.5)
</style>
