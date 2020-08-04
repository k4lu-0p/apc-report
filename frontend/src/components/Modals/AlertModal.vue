<template>
<!-- eslint-disable max-len -->
  <div class="modal w-full h-full fixed top-0 flex justify-center items-center p-10">
    <div class="bg-white shadow-xl rounded w-full">
      <div class="p-6">
        <div class="flex justify-center items-center py-6">
          <alert-icon
            v-if="type === 'forbidden' || type === 'dialog'"
            class="icon alert-icon"
          ></alert-icon>

          <accept-icon
            v-if="type === 'success'"
            class="icon accept-icon"
          ></accept-icon>
        </div>
        <h2 class="font-bold text-xl text-center p-3">{{ title }}</h2>
        <p class="p-3 text-left">
          {{ message }}
        </p>
      </div>
      <div class="flex justify-between items-center">

        <!-- yes -->
        <button
          v-if="type === 'dialog'"
          class= "w-1/2 rounded-br text-center bg-white border-teal-600 p-3 text-teal-600 text-lg font-medium"
          @click="$emit('confirm')">
          Confirmer
        </button>

        <!-- cancel -->
        <button
          :class="[ type !== 'dialog' ? 'w-full' : 'w-1/2' ]"
          class= "rounded-br text-center bg-gray-200 border-gray-200 p-3 border text-black text-lg font-medium"
          @click="$emit('cancel')">
          Quitter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ICONS } from '../../constants';

const { common: { AlertIcon, AcceptIcon } } = ICONS;

export default {
  name: 'alert-modal',
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  components: {
    AlertIcon,
    AcceptIcon,
  },
};
</script>

<style lang="stylus">
.modal
  background rgba(0,0,0,0.6);
  z-index 10;

.icon
  height 65px
  width 65px

.alert-icon
  fill theme('colors.red.600')
  color theme('colors.red.600')

.accept-icon
  fill theme('colors.teal.600')
  color theme('colors.teal.600')

</style>
