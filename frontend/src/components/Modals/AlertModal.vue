<template>
<!-- eslint-disable max-len -->
  <div class="modal w-full h-full fixed top-0 flex justify-center items-center p-10">
    <div class="bg-white shadow-xl rounded">
      <div class="p-6">
        <div class="flex justify-center items-center py-6">
          <alert-icon class="alert-icon"></alert-icon>
        </div>
        <h2 class="font-bold text-2xl text-center">Rendez-vous non terminé !</h2>
        <p class="p-3 text-left">
          Vous serez en mesure de <strong class="font-medium">le remplir uniquement à partir de la date de fin du rendez-vous.</strong>
        </p>
      </div>
      <div class="flex justify-between items-center">
        <button class= "rounded-br w-full text-center bg-gray-200 border-gray-200 p-3 border text-black text-lg font-medium" @click="cancel($event)">Quitter</button>
      </div>
    </div>
  </div>
</template>

<script>
import { IMAGES } from '../../constants';

const { svg: { AlertIcon } } = IMAGES;

export default {
  name: 'alert-modal',
  components: {
    AlertIcon,
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="stylus">
.modal
  background rgba(0,0,0,0.6);
  z-index 10;

.alert-icon
  fill theme('colors.red.600')
  color theme('colors.red.600')
  height 65px
  width 65px
</style>
