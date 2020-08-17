export default {
  methods: {
    logout() {
      this.$store.dispatch('authModule/logout').then(() => {
        this.$router.push({ name: this.$const.NAVIGATION.LOGIN_PAGE.NAME });
      });
    },
  },
};
