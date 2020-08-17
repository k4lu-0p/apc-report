<template>
  <div class="background-svg w-screen h-screen flex flex-col justify-center items-center">
    <transition mode="in-out" enter-active-class="animated fadeIn">
      <img
        src="/img/logo/apcr-short.png"
        class="logo-full mb-10"
        alt="Alpha Plus Courtage Report"
        v-if="formIsVisible"
      />
    </transition>

    <transition mode="in-out" enter-active-class="animated fadeInUp">
      <login-form v-if="formIsVisible" />
    </transition>
  </div>
</template>

<script>
import LoginForm from '../components/Forms/LoginForm.vue';

export default {
  data() {
    return {
      formIsVisible: false,
    };
  },
  name: 'login-page',
  components: {
    LoginForm,
  },
  mounted() {
    this.formIsVisible = true;
  },
};
</script>

<style lang="stylus" scoped>
  .logo-full
    height 140px
</style>
