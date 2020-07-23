<template>
  <div class="px-4 py-4 border-b">
    <p class="font-medium text-gray-800">{{ customer.name }}</p>
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

<style>

</style>

<style>

</style>
