<template>
  <button
    @click="updateActiveFilter"
    class="rounded-full mr-2 px-3 py-1/2 text-xs border transition-all duration-300 ease-in-out"
    :class="[ activeFilter === value ? 'active' : 'passive' ]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    activeFilter: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateActiveFilter() {
      this.$emit('onUpdateFilter', this.value);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .active
    @apply border-purple-800 bg-purple-800 text-white shadow-inner font-bold

  .passive
    @apply text-gray-500 shadow-inner font-medium bg-white
</style>
