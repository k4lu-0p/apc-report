export default {
  data() {
    return {
      listenerVisibility: null,
      appIsVisible: true,
      bypassedRouteNames: ['appointments-create', 'reports-edit'],
    };
  },
  methods: {
    handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        if (!this.bypassedRouteNames.includes(this.$route.name)) {
          this.appIsVisible = false;
          window.location.reload();
        }
      }
    },
  },
  mounted() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
};
