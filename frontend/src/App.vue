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

  <!-- admin: show account connected -->
  <info
    v-if="this.$store.getters['authModule/getUser'].name"
    :title="this.$store.getters['authModule/getUser'].name"
    :visible="isInfoVisible"
  >
    <user-icon class="user-icon"></user-icon>
  </info>

</div>

</template>

<script>
import TabsNavigator from './components/Navigators/TabsNavigator.vue';
import autoReloading from './mixins/autoReloading';
import Spinner from './components/Spinner.vue';
import Info from './components/Info.vue';
import { ICONS } from './constants';

const { common: { UserIcon } } = ICONS;

export default {
  name: 'app',
  mixins: [autoReloading],
  components: {
    TabsNavigator,
    Spinner,
    UserIcon,
    Info,
  },
  computed: {
    isInfoVisible() {
      return (
        this.$store.getters['authModule/hasSwitchedAccount']
        && this.$route.name !== this.$const.NAVIGATION.HOME_SETTING_PAGE.NAME
      );
    },
    isMobile() {
      if (window.innerWidth <= this.$const.MISC.LIMIT_WIDTH_SCREEN) {
        return true;
      }
      this.$store.dispatch('authModule/logout');
      return false;
    },
    routesHasTabsNavigator() {
      return [
        this.$const.NAVIGATION.HOME_PAGE.NAME, // index
        this.$const.NAVIGATION.LIST_CUSTOMER_PAGE.NAME,
        this.$const.NAVIGATION.LIST_APPOINTMENT_PAGE.NAME,
        this.$const.NAVIGATION.HOME_SETTING_PAGE.NAME,
        this.$const.NAVIGATION.LIST_REPORT_PAGE.NAME,
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
  // background-image url('/img/bg/bg_main.svg')
  background-attachment fixed
  background-size cover
  background-position center

.user-icon
  fill theme('colors.gray.800')
  color theme('colors.gray.800')
  height 20px
  width 20px
</style>
