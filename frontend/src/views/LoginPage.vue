<template>
  <div class="">
    <login-form />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LoginForm from '@/components/Forms/LoginForm.vue';

@Component({
  components: {
    LoginForm,
  },
})
export default class LoginPage extends Vue {

}

</script>

<style lang="scss" scoped>

</style>
