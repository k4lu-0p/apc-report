<template>
<!-- eslint-disable max-len -->
  <!-- eslint-disable-next-line max-len -->
  <div class="hidden md:flex h-screen border-r bg-white md:flex-col justify-between z-20">
    <div class="w-full px-4 flex flex-col drawers-navigator">
        <router-link
          id="tab-home"
          :to="{name: $const.NAVIGATION.HOME_PAGE.NAME}"
          class="drawer-item w-full flex items-center pt-2 pb-1 cursor-pointer"
          :class="{'drawer-item-active': $route.name === $const.NAVIGATION.HOME_PAGE.NAME}"
        >
          <home-icon class="icon"></home-icon>
          <span class="icon-label block text-lg px-6 py-2">
            {{ $t('navigator.tabs.home') }}
          </span>
        </router-link>

        <router-link
          id="tab-appointment"
          :to="{name: $const.NAVIGATION.LIST_APPOINTMENT_PAGE.NAME}"
          class="drawer-item w-full flex items-center pt-2 pb-1 cursor-pointer"
          :class="{'drawer-item-active': $route.name === $const.NAVIGATION.LIST_APPOINTMENT_PAGE.NAME}"
        >
          <AppointmentsIcon class="icon"></AppointmentsIcon>
          <span class="icon-label block text-lg px-6 py-2">
            {{ $t('navigator.tabs.appointments') }}
          </span>
        </router-link>

        <router-link
          id="tab-reports"
          :to="{name: $const.NAVIGATION.LIST_REPORT_PAGE.NAME}"
          class="drawer-item w-full flex items-center pt-2 pb-1 cursor-pointer"
          :class="{'drawer-item-active': $route.name === $const.NAVIGATION.LIST_REPORT_PAGE.NAME}"
        >
          <reports-icon class="icon"></reports-icon>
          <span class="icon-label block text-lg px-6 py-2">
            {{ $t('navigator.tabs.reports') }}
          </span>
        </router-link>

        <router-link
          id="tab-customers"
          :to="{name: $const.NAVIGATION.LIST_CUSTOMER_PAGE.NAME}"
          class="drawer-item w-full flex items-center pt-2 pb-1 cursor-pointer"
          :class="{'drawer-item-active': $route.name === $const.NAVIGATION.LIST_CUSTOMER_PAGE.NAME}"
        >
          <users-icon class="icon"></users-icon>
          <span class="icon-label block text-lg px-6 py-2">
            {{ $t('navigator.tabs.customers') }}
          </span>
        </router-link>

        <router-link
          id="tab-settings"
          :to="{name: $const.NAVIGATION.HOME_SETTING_PAGE.NAME}"
          class="drawer-item w-full flex items-center pt-2 pb-1 cursor-pointer"
          :class="{'drawer-item-active': $route.name === $const.NAVIGATION.HOME_SETTING_PAGE.NAME}"
        >
          <settings-icon class="icon"></settings-icon>
          <span class="icon-label block text-lg px-6 py-2">
            {{ $t('navigator.tabs.settings') }}
          </span>
        </router-link>
    </div>
    <div>
       <!-- logout -->
      <button
        @click="logout"
        class="text-lg mx-auto bg-white w-full font-bold py-2 rounded focus:outline-none focus:shadow-outline"
      >
        {{ $t('form.login.logout.label') }}
      </button>
    </div>
  </div>
</template>

<script>
import { ICONS } from '../../constants';
import logout from '../../mixins/logout';

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
  name: 'drawers-navigator',
  mixins: [logout],
  components: {
    HomeIcon,
    SettingsIcon,
    ReportsIcon,
    UsersIcon,
    AppointmentsIcon,
  },
};
</script>

<style lang="stylus" scoped>
.drawers-navigator-hidden
  bottom -60px !important

.drawers-navigator
  transition all 0.3s !important
  .drawer-item
    transition all 0.2s
    fill theme('colors.gray.800')
    color theme('colors.gray.800')
    .icon
      width 22px
      height 22px
      margin-bottom 0.25rem
    .icon-label
      @apply font-bold
  .drawer-item-active
    padding-left 10px
    fill theme('colors.purple.800')
    color theme('colors.purple.800')
</style>
