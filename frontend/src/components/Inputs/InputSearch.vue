<template>
<!-- eslint-disable max-len -->
  <div>
    <div class="relative appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12 flex justify-between">
      <input
        class="pl-3 bg-transparent absolute h-full w-5/6 text-lg left-0 top-0 text-gray-700"
        :id="id"
        type="search"
        v-model="search"
        :placeholder="placeholder"
        @keydown="handleKeyDown"
      >
      <button
        @click="onSearch"
        :disabled="status === $const.API.STATUS.LOADING"
        class="w-1/6 absolute right-0 top-0 h-full flex justify-center items-center">
        <moon-loader
          class="v-spinner-custom"
          v-if="status === $const.API.STATUS.LOADING"
          :color="$const.MISC.SPINNER.COLOR"
        ></moon-loader>
        <magnify-icon v-else class="magnify-icon"></magnify-icon>
      </button>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import { ICONS } from '../../constants';

const { common: { MagnifyIcon } } = ICONS;

export default {
  name: 'input-search',
  components: {
    MagnifyIcon,
  },
  data() {
    return {
      search: '',
    };
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    placeholder: {
      required: true,
      type: String,
    },
    status: {
      required: true,
      type: String,
    },
  },
  methods: {
    onSearch() {
      this.$emit('search', this.search);
    },
    // eslint-disable-next-line func-names
    handleKeyDown: debounce(function () {
      this.onSearch();
    }, 300),
  },
};
</script>

<style lang="stylus">

</style>
