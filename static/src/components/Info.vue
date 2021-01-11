<template>
<!--  eslint-disable max-len */ -->
  <!-- eslint-disable-next-line max-len -->
  <div v-if="visible" class="flex items-center font-bold text-gray-800 info bg-white rounded-r shadow p-4 fixed left-0 mb-12">
    <div class="flex items-center justify-center pr-2">
      <slot></slot>
    </div>
    <p class="text-xs">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: {
    title: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="stylus">
  .info
    bottom 30px
</style>
