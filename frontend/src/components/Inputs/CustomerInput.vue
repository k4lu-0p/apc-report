<template>
<!-- eslint-disable max-len -->
  <div>
    <label class="font-medium" for="customer">
      {{ label }}
      <span class="text-red-500">*</span>
    </label>
    <div class="relative input-form h-10 flex justify-between">
      <input
        title="customer"
        class="bg-transparent absolute h-full w-5/6 left-0 top-0 text-gray-700"
        id="customer"
        type="search"
        v-model="requestParams.search"
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
      <div v-if="customers.length > 0">
        <ul class="customers-list">
          <li
            @click="onClickCustomer($event, customer)"
            class="py-2 customer-item flex justify-between items-center"
            v-for="(customer, index) in customers"
            :key="`customer-${index}-${customer.id}`"
          >
            <span class="w-5/6 h-full" >
              {{ customer.name }}
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
import { IMAGES } from '../../constants';

const { svg: { AddIcon, MagnifyIcon } } = IMAGES;

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
      requestParams: {
        search: '',
        limit: 4,
        offset: 0,
      },
      customerSelected: null,
    };
  },
  methods: {
    handleKeyUp() {
      if (this.status !== this.$const.API.STATUS.LOADING) {
        if (this.requestParams.search.length >= 2) {
          this.$store.dispatch('customersModule/fetchCustomers', this.requestParams)
            .then(() => {
              if (this.$store.getters['customersModule/getCustomers'].length === 0) {
                this.$emit('onNoResult', true);
              } else {
                this.$emit('onNoResult', false);
              }
            });
        }
      }
    },
    onClickSearchCustomer() {
      this.handleKeyUp();
    },
    onClickCustomer(event, customer) {
      this.customerSelected = customer;
      this.requestParams.search = customer.name;
      this.$store.commit('customersModule/setCustomers', []);
      this.$emit('onClickCustomer', this.customerSelected);
    },
    onClearField() {
      this.requestParams.search = '';
      this.$emit('clear');
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
