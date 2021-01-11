<template>
<!-- eslint-disable max-len */ -->
  <div
    @click="goTo($const.NAVIGATION.SHOW_CUSTOMER_PAGE.NAME, customer.id)"
    class="h-20 border-l-2 bg-white shadow mb-1 rounded-r border-purple-800 flex items-center">
    <p class="py-5 text-center w-full font-bold text-gray-800">{{ customer.commercial_name }}</p>
  </div>
</template>

<script>
export default {
  name: 'customer-item',
  props: {
    customer: Object,
  },
  computed: {
    location() {
      return JSON.parse(this.appointment.location);
    },
  },
};
</script>

<style lang="stylus">

</style>
