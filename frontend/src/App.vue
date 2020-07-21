<template>
  <div>
    <transition
      enter-active-class="animated slideInLeft faster-x2"
      leave-active-class="animated slideOutRight faster-x2"
      mode="out-in"
    >
        <router-view v-if="isMobile"/>
        <p v-else>Application uniquement disponible sur appareil mobile</p>
    </transition>

    <tabs-navigator
      v-if="Object.values(routesHasTabsNavigator).includes($route.name)"
    />
  </div>
</template>

<script>
import TabsNavigator from './components/Navigators/TabsNavigator.vue';

export default {
  name: 'app',
  components: {
    TabsNavigator,
  },
  computed: {
    isMobile() {
      if (window.innerWidth <= this.$const.CONFIG.LIMIT_WIDTH_SCREEN) {
        return true;
      }
      return false;
    },
    routesHasTabsNavigator() {
      return [
        this.$const.NAVIGATION.HOME_INDEX.NAME, // index
        this.$const.NAVIGATION.CUSTOMERS_HOME.NAME,
        this.$const.NAVIGATION.APPOINTMENTS_HOME.NAME,
        this.$const.NAVIGATION.SETTINGS_HOME.NAME,
        this.$const.NAVIGATION.REPORTS_HOME.NAME,
      ];
    },
  },
};
</script>

<style lang="stylus">
.faster-x2
  animation-duration 0.25s !important
</style>
