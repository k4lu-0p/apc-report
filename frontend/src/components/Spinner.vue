<template>
<!-- eslint-disable max-len -->
  <transition
    mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div
      v-if="isVisible"
      class="fixed md:static left-0 w-screen md:w-full md:py-20 flex flex-col justify-center items-center h-full"
    >
      <moon-loader :color="$const.MISC.SPINNER.COLOR"></moon-loader>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
};

</script>

<style lang="stylus">

</style>
