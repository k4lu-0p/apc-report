<template>
<!-- eslint-disable max-len -->
  <div class="sticky inset-x-0 top-0 left-0 z-10 w-full h-12">
    <div
      class="h-full shadow-sm bg-white"
    >
      <div class="px-4 flex justify-between h-full">

        <slot name="left"></slot>
        <slot name="center"></slot>
        <slot name="right"></slot>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
};
</script>

<style lang="stylus">

</style>
