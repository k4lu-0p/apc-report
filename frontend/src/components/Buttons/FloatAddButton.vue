<template>
  <transition
    enter-active-class="animated slideInRight faster-x2"
    leave-active-class="animated slideOutRight faster-x2"
    mode="out-in"
  >
    <div v-if="isVisible" class="add-button-wrapper">
      <button class="add-button-item" @click="$emit('onTap')">
        <add-icon class="add-button-icon"></add-icon>
      </button>
    </div>
  </transition>
</template>

<script>
import { ICONS } from '../../constants';

const { common: { AddIcon } } = ICONS;

export default {
  data() {
    return {
      isVisible: false,
    };
  },
  components: {
    AddIcon,
  },
  created() {
    setTimeout(() => {
      this.isVisible = true;
    }, 300);
  },
};
</script>

<style lang="stylus">
.add-button-wrapper
  position fixed
  z-index 9999
  right 20px
  bottom 80px

  .add-button-item
    display flex
    justify-content center
    align-items center
    width 45px
    height 45px
    fill theme('colors.white')
    background-color theme('colors.teal.600')
    border-radius theme('borderRadius.full')
    box-shadow theme('boxShadow.xl')

    .add-button-icon
      transition all 0.2s
      width 20px
      height 20px

</style>
