<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="pt-16"></div> <!-- Prevent hidden elements -->
    <section
      class="tabs-navigator block fixed inset-x-0 bottom-0 z-10 bg-white shadow-2xl"
      :class="{'tabs-navigator-hidden': !isVisible}"
    >
      <div id="tabs" class="flex justify-between">

        <router-link
          id="tab-users"
          :to="{name: $const.NAVIGATION.TABS.USERS_PAGE}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.TABS.USERS_PAGE}"
        >
          <users-icon class="icon"></users-icon>
          <span class="block text-xs">{{ $t('tabsNavigator.customers') }}</span>
        </router-link>
        <router-link
          id="tab-reports"
          :to="{name: $const.NAVIGATION.TABS.REPORTS_PAGE}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.TABS.REPORTS_PAGE}"
        >
          <reports-icon class="icon"></reports-icon>
          <span class="block text-xs">{{ $t('tabsNavigator.reports') }}</span>
        </router-link>

         <router-link
          id="tab-home"
          :to="{name: $const.NAVIGATION.TABS.HOME_PAGE}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.TABS.HOME_PAGE}"
        >
          <home-icon class="icon"></home-icon>
          <span class="block text-xs">{{ $t('tabsNavigator.home') }}</span>
        </router-link>

        <router-link
          id="tab-support"
          :to="{name: $const.NAVIGATION.TABS.APPOINTMENTS_PAGE}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.TABS.APPOINTMENTS_PAGE}"
        >
          <AppointmentsIcon class="icon"></AppointmentsIcon>
          <span class="block text-xs">{{ $t('tabsNavigator.appointments') }}</span>
        </router-link>

        <router-link
          id="tab-settings"
          :to="{name: $const.NAVIGATION.TABS.SETTINGS_PAGE}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.TABS.SETTINGS_PAGE}"
        >
          <settings-icon class="icon"></settings-icon>
          <span class="block text-xs">{{ $t('tabsNavigator.settings') }}</span>
        </router-link>

      </div>
    </section>
  </div>
</template>

<script>
import { IMAGES } from '../../constants';

const {
  svg: {
    HomeIcon,
    SettingsIcon,
    ReportsIcon,
    UsersIcon,
    AppointmentsIcon,
  },
} = IMAGES;

export default {
  name: 'tabs-navigator',
  components: {
    HomeIcon,
    SettingsIcon,
    ReportsIcon,
    UsersIcon,
    AppointmentsIcon,
  },
  data() {
    return {
      isVisible: true,
      lastScrollPosition: 0,
    };
  },
  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // eslint-disable-next-line max-len
      this.isVisible = (currentScrollPosition > this.lastScrollPosition) || (currentScrollPosition === 0);
      this.lastScrollPosition = currentScrollPosition;
    },
    logout() {
      console.log('Déconnexion');
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style lang="stylus">
.tabs-navigator-hidden
  bottom -60px !important

.tabs-navigator
  transition all 0.3s !important
  #tabs
    .tab
      transition all 0.2s
      .icon
        width 25px
        height 25px
        margin-bottom 0.25rem
    .tab-active
      fill theme('colors.teal.600')
      color theme('colors.teal.600')
</style>
