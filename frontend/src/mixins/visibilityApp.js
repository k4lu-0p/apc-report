export default {
  data() {
    return {
      listenerVisibility: null,
      appIsVisible: true,
    };
  },
  methods: {
    handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        this.appIsVisible = false;
        window.location.reload();
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
