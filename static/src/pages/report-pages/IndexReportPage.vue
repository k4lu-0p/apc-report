<template>
  <transition
    enter-active-class="animated slideInLeft faster-x2"
    leave-active-class="animated slideOutRight faster-x2"
    mode="out-in"
  >
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'index-report-page',
};
</script>

<style>

</style>
