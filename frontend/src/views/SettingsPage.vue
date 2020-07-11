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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { authModule } from '../store/auth-module';

@Component
export default class SettingsPage extends Vue {
  private logout(): void {
    authModule.logout().then(() => {
      this.$router.push({ path: '/login' }); // TODO: fix it
    });
  }
}

</script>
