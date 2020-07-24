<template>
<!-- eslint-disable max-len -->
  <div class="container mx-auto p-4">
    <div class="flex flex-col justify-center items-center">
        <!-- logout -->
        <button
          @click="logout"
          class="mx-auto bg-teal-600 hover:bg-teal-800 w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
        >
          {{ $t('form.login.logout.label') }}
        </button>
    </div>
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
        this.$router.push({ name: this.$const.NAVIGATION.LOGIN_INDEX.NAME });
      });
    },
  },
};
</script>
