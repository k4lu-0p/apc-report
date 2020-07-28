<template>
  <transition
    mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div
      v-if="isVisible"
      class="fixed left-0 w-screen flex flex-col justify-center items-center h-full"
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
