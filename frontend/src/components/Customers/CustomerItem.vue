<template>
  <div class="border my-2 rounded-r flex shadow-xs">
    <!-- <div class="bg-teal-600 pl-1"></div> -->
    <p class="p-3 font-medium text-gray-800">{{ customer.name }}</p>
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
