<template>
<!-- eslint-disable max-len -->

  <!-- Main -->
  <div class="flex justify-center items-center h-screen">
    <button
      @click="logout"
      class="mx-auto bg-teal-600 hover:bg-teal-800 px-24 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >{{ $t('form.logout.label') }}</button>
  </div>
</template>

<script>

export default {
  name: 'settings-page',
  components: {
  },
  methods: {
    logout() {
      this.$store.dispatch('authModule/logout').then(() => {
        this.$router.push({ path: '/login' });
      });
    },
  },
};
</script>
