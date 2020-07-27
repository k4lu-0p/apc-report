<template>
<!-- eslint-disable max-len -->
  <div>
    <div class="pt-16"></div> <!-- prevent hidden elements by offset with bar -->
    <div
      class="h-12 block shadow-sm fixed inset-x-0 top-0 z-10 bg-white"
    >
      <div class="px-4 w-screen flex justify-between h-full">

        <!-- back button -->
        <div v-if="hasBackButton" @click="$router.go(-1)"  class="back-icon-wrapper flex justify-center items-center">
          <back-icon class="back-icon"></back-icon>
        </div>

        <!-- search input -->
        <div v-if="hasSearchInput" class="magnify-icon-wrapper flex justify-between items-center w-full">
          <div class="flex justify-center items-center w-11/12">
            <input type="text" class="p-2 w-full outline-none">
          </div>
          <button class="flex justify-center items-center h-full w-1/12">
            <magnify-icon class="magnify-icon"></magnify-icon>
          </button>
        </div>

        <!-- filter menu -->
        <!-- <div v-if="hasFilterMenu" class="magnify-icon-wrapper flex justify-center items-center">
          <magnify-icon class="magnify-icon"></magnify-icon>
        </div> -->

      </div>

    </div>
  </div>
</template>

<script>
import { IMAGES } from '../../constants';

const { svg: { BackIcon, MagnifyIcon } } = IMAGES;

export default {
  name: 'top-bar',
  components: {
    BackIcon,
    MagnifyIcon,
  },
  props: {
    hasBackButton: {
      type: Boolean,
      default: false,
    },
    hasSearchInput: {
      type: Boolean,
      default: false,
    },
    hasFilterMenu: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus">
.back-icon-wrapper
  .back-icon
    height 23px
    width 23px
    color theme('colors.teal.600')
    fill theme('colors.teal.600')
</style>
