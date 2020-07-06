<template>
  <div>
    <transition
      enter-active-class="animated slideInLeft faster-x2"
      leave-active-class="animated slideOutRight faster-x2"
      mode="out-in"
    >
        <router-view/>
    </transition>

    <tabs-navigator
      v-if="Object.values($const.NAVIGATION.TABS).includes($route.name)"
    />
  </div>
</template>

<script>
import TabsNavigator from '@/components/Navigators/TabsNavigator.vue';

export default {
  name: 'app',
  components: {
    TabsNavigator,
  },
};
</script>

<style lang="stylus">
.faster-x2
  animation-duration 0.25s !important
</style>
