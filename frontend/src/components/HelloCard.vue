<template>
<!-- eslint-disable max-len -->
  <div ref="hello" class="offset text-center font-medium text-lg bg-white shadow my-2 rounded w-full py-6 px-2 mx-auto">
    <p class="text-xl text-gray-800 text-center pb-3">Bonjour, <strong class="text-yellow-750">{{ this.userName }}</strong>.</p>
    <p class="">Vous avez <span class="font-bold text-xl text-purple-800">{{ String(this.appointmentsLength) }}</span> rendez-vous de programmé(s), aujourd’hui. Bonne journée et bonne route !</p>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'HelloCard',
  props: {
    appointmentsLength: Number,
    userName: String,
  },
  mounted() {
    const timeline = gsap.timeline({
      delay: this.delayAnim,
      defaults: {
        duration: 1,
        ease: 'power3',
      },
    });

    timeline.to(this.$refs.hello, 1, { x: 0, rotation: 0 });
  },
};
</script>

<style lang="stylus" scoped>
  .offset
    transform translateX(-500px)
</style>
