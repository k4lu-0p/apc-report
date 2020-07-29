<template>
<!-- eslint-disable max-len */ -->
  <div class="h-20 rounded-r flex items-center justify-center shadow-lg bg-white rounded">
    <!-- <div class="bg-teal-600 pl-1"></div> -->
    <p class="py-5 text-center w-full font-bold text-gray-800">{{ customer.name }}</p>
    <!-- <button
      @click="$emit('delete', customer.id)"
    >
      Supprimer
    </button> -->
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
