<template>
<!-- eslint-disable max-len -->
  <div class="modal w-full h-full fixed top-0 flex justify-center items-center p-10">
    <div class="bg-white shadow-xl rounded">
      <div class="p-6">
        <div class="flex justify-center items-center py-6">
          <accept-icon class="accept-icon"></accept-icon>
        </div>
        <h2 class="font-bold text-2xl text-center">Rendez-vous créé !</h2>
        <p class="p-3 text-left">
          Un rapport associé au rendez-vous est également créé. Vous serez en mesure de <strong class="font-medium">le remplir uniquement à partir de la date de fin du rendez-vous.</strong>
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

const { svg: { AcceptIcon } } = IMAGES;

export default {
  name: 'confirm-appointment-modal',
  components: {
    AcceptIcon,
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

.accept-icon
  fill theme('colors.teal.600')
  color theme('colors.teal.600')
  height 65px
  width 65px
</style>
