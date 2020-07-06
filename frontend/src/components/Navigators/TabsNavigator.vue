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
          id="tab-home"
          :to="{name: $const.NAVIGATION.TABS.HOME_PAGE}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.TABS.HOME_PAGE}"
        >
          <svg width="25" height="25" viewBox="0 0 42 42" class="inline-block mb-1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M21.0847458,3.38674884 C17.8305085,7.08474576 17.8305085,10.7827427 21.0847458,14.4807396 C24.3389831,18.1787365 24.3389831,22.5701079 21.0847458,27.6548536 L21.0847458,42 L8.06779661,41.3066256 L6,38.5331279 L6,26.2681048 L6,17.2542373 L8.88135593,12.4006163 L21.0847458,2 L21.0847458,3.38674884 Z" fill="currentColor" fill-opacity="0.1"></path>
              <path d="M11,8 L33,8 L11,8 Z M39,17 L39,36 C39,39.3137085 36.3137085,42 33,42 L11,42 C7.6862915,42 5,39.3137085 5,36 L5,17 L7,17 L7,36 C7,38.209139 8.790861,40 11,40 L33,40 C35.209139,40 37,38.209139 37,36 L37,17 L39,17 Z" fill="currentColor"></path>
              <path d="M22,27 C25.3137085,27 28,29.6862915 28,33 L28,41 L16,41 L16,33 C16,29.6862915 18.6862915,27 22,27 Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"></path>
              <rect fill="currentColor" transform="translate(32.000000, 11.313708) scale(-1, 1) rotate(-45.000000) translate(-32.000000, -11.313708) " x="17" y="10.3137085" width="30" height="2" rx="1"></rect>
              <rect fill="currentColor" transform="translate(12.000000, 11.313708) rotate(-45.000000) translate(-12.000000, -11.313708) " x="-3" y="10.3137085" width="30" height="2" rx="1"></rect>
            </g>
          </svg>
          <span class="block text-xs">{{ $t('tabsNavigator.home') }}</span>
        </router-link>
        <router-link
          id="tab-users"
          :to="{name: $const.NAVIGATION.TABS.USERS_PAGE}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.TABS.USERS_PAGE}"
        >
          <users-icon class="icon"></users-icon>
          <span class="block text-xs">{{ $t('tabsNavigator.users') }}</span>
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
          id="tab-support"
          :to="{name: $const.NAVIGATION.TABS.SUPPORT_PAGE}"
          class="tab w-full flex flex-col items-center pt-2 pb-1 cursor-pointer"
          :class="{'tab-active': $route.name === $const.NAVIGATION.TABS.SUPPORT_PAGE}"
        >
          <support-icon class="icon"></support-icon>
          <span class="block text-xs">{{ $t('tabsNavigator.support') }}</span>
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
    SupportIcon,
    SettingsIcon,
    ReportsIcon,
    UsersIcon,
  },
} = IMAGES;

export default {
  name: 'tabs-navigator',
  components: {
    SupportIcon,
    SettingsIcon,
    ReportsIcon,
    UsersIcon,
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
