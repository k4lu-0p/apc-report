/* eslint-disable vue/no-unused-components */
<!-- eslint-disable max-len -->
<template>
  <div class="md:hidden">
    <div class="pt-14"></div> <!-- Prevent hidden elements by offset with bar -->
    <section
      class="tabs-navigator block fixed inset-x-0 bottom-0 z-10 bg-white shadow-2xl"
      :class="{'tabs-navigator-hidden': !isVisible}"
    >
      <div id="tabs" class="flex justify-between">

         <router-link
          id="tab-home"
          :to="{name: $const.NAVIGATION.HOME_PAGE.NAME}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.HOME_PAGE.NAME}"
        >
          <home-icon class="icon"></home-icon>
          <span class="icon-label block text-xs">{{ $t('navigator.tabs.home') }}</span>
        </router-link>

        <router-link
          id="tab-appointment"
          :to="{name: $const.NAVIGATION.LIST_APPOINTMENT_PAGE.NAME}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.LIST_APPOINTMENT_PAGE.NAME}"
        >
          <AppointmentsIcon class="icon"></AppointmentsIcon>
          <span class="icon-label block text-xs">{{ $t('navigator.tabs.appointments') }}</span>
        </router-link>

        <router-link
          id="tab-reports"
          :to="{name: $const.NAVIGATION.LIST_REPORT_PAGE.NAME}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.LIST_REPORT_PAGE.NAME}"
        >
          <reports-icon class="icon"></reports-icon>
          <span class="icon-label block text-xs">{{ $t('navigator.tabs.reports') }}</span>
        </router-link>

        <router-link
          id="tab-customers"
          :to="{name: $const.NAVIGATION.LIST_CUSTOMER_PAGE.NAME}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.LIST_CUSTOMER_PAGE.NAME}"
        >
          <users-icon class="icon"></users-icon>
          <span class="icon-label block text-xs">{{ $t('navigator.tabs.customers') }}</span>
        </router-link>

        <router-link
          id="tab-settings"
          :to="{name: $const.NAVIGATION.HOME_SETTING_PAGE.NAME}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.HOME_SETTING_PAGE.NAME}"
        >
          <settings-icon class="icon"></settings-icon>
          <span class="icon-label block text-xs">{{ $t('navigator.tabs.settings') }}</span>
        </router-link>

      </div>
    </section>
  </div>
</template>

<script>
import { ICONS } from '../../constants';

const {
  common: {
    HomeIcon,
    SettingsIcon,
    ReportsIcon,
    UsersIcon,
    AppointmentsIcon,
  },
} = ICONS;

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
  },
  mounted() {
    // window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.onScroll);
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
      fill theme('colors.gray.800')
      color theme('colors.gray.800')
      .icon
        width 22px
        height 22px
        margin-bottom 0.25rem
      .icon-label
        @apply font-bold
    .tab-active
      fill theme('colors.purple.800')
      color theme('colors.purple.800')
</style>
