<template>
  <div ref="title" class="py-6 bg-white shadow rounded w-full mx-auto">
    <h1 class="text-center font-bold text-gray-800 text-2xl">Bienvenue sur APC Report</h1>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'HomeTitle',
  mounted() {
    const timeline = gsap.timeline({
      delay: this.delayAnim,
      defaults: {
        duration: 1,
        ease: 'power2',
      },
    });

    timeline.from(this.$refs.title, 1, { x: 300 });
    timeline.to(this.$refs.title, 1, { x: 0, rotation: 0 });
  },
};

</script>

<style>

</style>
