<template>
  <div class="background-svg w-screen h-screen flex flex-col justify-center items-center">
    <transition mode="in-out" enter-active-class="animated fadeInUp">
      <login-form v-if="formIsVisible" />
    </transition>
  </div>
</template>

<script>
import LoginForm from '../../components/Forms/LoginForm.vue';

export default {
  data() {
    return {
      formIsVisible: false,
    };
  },
  name: 'login-index',
  components: {
    LoginForm,
  },
  mounted() {
    this.formIsVisible = true;
  },
};
</script>

<style lang="stylus" scoped>

</style>
