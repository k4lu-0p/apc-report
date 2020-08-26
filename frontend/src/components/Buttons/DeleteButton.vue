<template>
<!-- delete button -->
  <div class="delete-icon-wrapper flex justify-between items-center w-full">
    <div class="flex justify-center items-center w-11/12">
      <input type="text" class="p-2 w-full outline-none">
    </div>
    <button
      @click="$emit('delete')"
      class="flex justify-center items-center h-full w-1/12">
      <delete-icon class="delete-icon"></delete-icon>
    </button>
  </div>
</template>

<script>
import { ICONS } from '../../constants';

const { common: { DeleteIcon } } = ICONS;

export default {
  name: 'DeleteButton',
  components: {
    DeleteIcon,
  },
};
</script>

<style lang="stylus" scoped>
.delete-icon-wrapper
  .delete-icon
    height 23px
    width 23px
    color theme('colors.red.600')
    fill theme('colors.red.600')
</style>
