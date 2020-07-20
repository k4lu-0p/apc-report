<template>
<!-- eslint-disable max-len -->
  <div>
    <div class="pt-16"></div> <!-- Prevent hidden elements by offset with bar -->
    <div class="block shadow-md fixed inset-x-0 top-0 z-10 bg-white w-screen flex justify-between p-4">
      <div @click="$router.go(-1)"  class="back-icon-wrapper flex justify-center items-center">
        <back-icon class="back-icon-item"></back-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { IMAGES } from '../../constants';

const { svg: { BackIcon } } = IMAGES;

export default {
  name: 'top-bar',
  components: {
    BackIcon,
  },
};
</script>

<style lang="stylus">
.back-icon-wrapper
  .back-icon-item
    height 25px
    width 25px
    color theme('colors.teal.600')
    fill theme('colors.teal.600')
</style>
