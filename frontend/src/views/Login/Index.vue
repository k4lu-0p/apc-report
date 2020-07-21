<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <login-form />
  </div>
</template>

<script>
import LoginForm from '../../components/Forms/LoginForm.vue';

export default {
  name: 'login-index',
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss" scoped>

</style>
