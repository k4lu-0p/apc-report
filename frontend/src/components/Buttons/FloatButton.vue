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
    width 45px
    height 45px
    fill theme('colors.white')
    background-color theme('colors.teal.600')
    border-radius theme('borderRadius.full')
    box-shadow theme('boxShadow.xl')

    .button-icon > *
      transition all 0.2s
      width 20px
      height 20px

</style>
