<template>
<!-- eslint-disable max-len -->
  <div class="sticky inset-x-0 top-0 left-0 z-10 w-full h-12">
    <div
      class="h-full shadow-sm bg-white"
    >
      <div class="px-4 flex justify-between h-full">

        <!-- back button -->
        <div v-if="hasBackButton" @click="$router.go(-1)"  class="back-icon-wrapper flex justify-center items-center">
          <back-icon class="back-icon"></back-icon>
        </div>

        <div v-if="title !== ''">
          <p>{{ title }}</p>
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

        <!-- delete button -->
        <div v-if="hasDeleteButton" class="delete-icon-wrapper flex justify-between items-center w-full">
          <div class="flex justify-center items-center w-11/12">
            <input type="text" class="p-2 w-full outline-none">
          </div>
          <button
            @click="$emit('delete')"
            class="flex justify-center items-center h-full w-1/12">
            <delete-icon class="delete-icon"></delete-icon>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ICONS } from '../../constants';

const { common: { BackIcon, MagnifyIcon, DeleteIcon } } = ICONS;

export default {
  name: 'top-bar',
  components: {
    BackIcon,
    MagnifyIcon,
    DeleteIcon,
  },
  props: {
    hasBackButton: {
      required: false,
      type: Boolean,
      default: false,
    },
    hasSearchInput: {
      required: false,
      type: Boolean,
      default: false,
    },
    hasFilterMenu: {
      required: false,
      type: Boolean,
      default: false,
    },
    hasDeleteButton: {
      required: false,
      type: Boolean,
      default: false,
    },
    title: {
      required: false,
      type: String,
      default: '',
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

.delete-icon-wrapper
  .delete-icon
    height 23px
    width 23px
    color theme('colors.red.600')
    fill theme('colors.red.600')
</style>
