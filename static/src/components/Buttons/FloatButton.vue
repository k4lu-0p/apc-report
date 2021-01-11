<template>
  <transition
    enter-active-class="animated slideInRight faster-x2"
    leave-active-class="animated slideOutRight faster-x2"
    mode="out-in"
  >
    <div v-if="isVisible" class="button-wrapper">
      <button class="button-item" @click="$emit('tap')">
        <div class="button-icon">
          <slot></slot>
        </div>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'float-button',
  data() {
    return {
      isVisible: false,
    };
  },
  components: {
    // AddIcon,
  },
  created() {
    setTimeout(() => {
      this.isVisible = true;
    }, 300);
  },
};
</script>

<style lang="stylus">
.button-wrapper
  position fixed
  z-index 9999
  right 20px
  bottom 80px

  .button-item
    display flex
    justify-content center
    align-items center
    width 52px
    height 52px
    fill theme('colors.white')
    background-color theme('colors.purple.800')
    border-radius theme('borderRadius.full')
    box-shadow theme('boxShadow.xl')
    border white solid 2px

    .button-icon > *
      transition all 0.2s
      width 20px
      height 20px

</style>
