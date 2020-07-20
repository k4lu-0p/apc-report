<template>
<!-- eslint-disable max-len -->
  <div>
    <label class="font-medium" for="location">
      {{ label }}
      <span class="text-red-500">*</span>
    </label>
    <div class="relative input-form h-10 flex justify-between">
      <input
        class="bg-transparent absolute h-full w-5/6 left-0 top-0 text-gray-700"
        id="location"
        type="text"
        v-model="search"
        @click="onClearField($event)"
        @keydown="onKeyDownEnter($event)"
        :placeholder="placeholder"
      >
      <span
      @click="onClickSearchLocations"
      class="w-1/6 absolute right-0 top-0 h-full flex justify-center items-center">
        <magnify-icon class="magnify-icon"></magnify-icon>
      </span>
    </div>
    <transition
      enter-active-class="animated fadeIn faster-x2"
      leave-active-class="animated fadeOut faster-x2"
      mode="out-in"
    >
      <div v-if="suggestionsHere.length > 0">
        <ul class="suggestions-list">
          <li
            @click="onClickLocation($event, suggestion)"
            class="py-2 suggestion-item flex justify-between items-center"
            v-for="(suggestion, index) in suggestionsHere"
            :key="`sug-${index}-${suggestion.locationId}`"
          >
            <span class="w-5/6 h-full" >
              {{ suggestion.label }}
            </span>
            <span class="flex justify-center items-center w-1/6">
              <add-icon class="add-icon"></add-icon>
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { IMAGES } from '../../constants';

const { svg: { MagnifyIcon, AddIcon } } = IMAGES;

export default {
  name: 'here-input',
  data() {
    return {
      hereSecret: 'I-IeX9wSTkJBD2X5FlgoWKhYjeBjcTyiqLt2CyDA7RQ',
      search: '',
      searchPrevious: '',
      suggestionsHere: [],
      suggestionSelected: null,
      loading: false,
    };
  },
  props: {
    label: String,
    placeholder: String,
  },
  components: {
    MagnifyIcon,
    AddIcon,
  },
  methods: {
    async onClickSearchLocations() {
      if (this.loading === false && this.search !== this.searchPrevious) {
        this.searchPrevious = this.search;
        this.suggestionsHere = [];
        this.loading = true;
        const { data: { suggestions } } = await this.$axios.get(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${this.hereSecret}&query=${this.search}&maxResults=4`);
        this.suggestionsHere = suggestions;
        this.loading = false;
      }
    },
    onClickLocation(event, suggestion) {
      event.target.classList.add('suggestion-selected');
      this.suggestionsHere = [];
      this.suggestionSelected = suggestion;
      this.search = this.suggestionSelected.label;
      this.searchPrevious = this.suggestionSelected.label;
      this.$emit('onClickLocation', this.suggestionSelected);
    },
    onKeyDownEnter(event) {
      if (event.keyCode === 13) {
        this.onClickSearchLocations();
      }
    },
    onClearField() {
      this.search = '';
      this.$emit('clear');
    },
  },
};
</script>

<style lang="stylus">
.input-form
  @apply appearance-none border
  @apply w-full py-2 px-3 text-gray-700
  @apply leading-tight
  border-width theme('borderWidth.default')
  border-color theme('borderColor.teal.600')
  border-top none
  border-left none
  border-right none

.magnify-icon
  color theme('colors.teal.600')
  fill theme('colors.teal.600')
  height 20px
  width 20px

.suggestions-list
  .suggestion-item
    @apply border-b text-teal-600
    transition all 0.2s
.suggestion-selected
  font-weight bold

.add-icon
  color theme('colors.teal.600')
  fill theme('colors.teal.600')
  width 10px
  height 10px
</style>
