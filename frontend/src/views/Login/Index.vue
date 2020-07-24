<template>
  <div class="background-svg w-screen h-screen flex flex-col justify-center items-center">
    <div class="skewed"></div>
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
      titleIsVisible: false,
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
// .skewed {
//   position: absolute;
//   top: -400px;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: theme('colors.gray.300');
//   z-index: -1;
//   transform: skewY(10deg);
//   transform-origin: top right;
// }
</style>
