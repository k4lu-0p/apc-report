<template>
<div>
  <div v-if="appIsVisible" class="min-h-screen bg-main">
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
  <spinner v-else is-visible></spinner>
</div>

</template>

<script>
import TabsNavigator from './components/Navigators/TabsNavigator.vue';
import autoReloading from './mixins/autoReloading';
import Spinner from './components/Spinner.vue';

export default {
  name: 'app',
  mixins: [autoReloading],
  components: {
    TabsNavigator,
    Spinner,
  },
  computed: {
    isMobile() {
      if (window.innerWidth <= this.$const.CONFIG.LIMIT_WIDTH_SCREEN) {
        return true;
      }
      this.$store.dispatch('authModule/logout');
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

.bg-main
  background-color #ffffff
  background-image url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23319795' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23319795' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2363aba9' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%2363aba9' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%238cc0be' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%238cc0be' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23b3d5d3' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23b3d5d3' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23d9eae9' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23d9eae9' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23ffffff' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23ffffff' points='943 900 1210 900 971 687'/%3E%3C/svg%3E")
  background-attachment fixed
  background-size cover
  background-position center
</style>
