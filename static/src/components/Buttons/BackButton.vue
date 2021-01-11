<template>
  <!-- back button -->
  <div
    @click="$router.go(-1)"
    class="back-icon-wrapper flex justify-center items-center">
    <back-icon class="back-icon"></back-icon>
  </div>
</template>

<script>
import { ICONS } from '../../constants';

const { common: { BackIcon } } = ICONS;

export default {
  name: 'BackButton',
  components: {
    BackIcon,
  },
};
</script>

<style lang="stylus" scoped>
  .back-icon-wrapper
    .back-icon
      height 23px
      width 23px
      color theme('colors.purple.800')
      fill theme('colors.purple.800')
</style>
