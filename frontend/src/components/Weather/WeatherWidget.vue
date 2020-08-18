<template>
<!-- eslint-disable max-len -->
  <div v-if="current && forecasts">
    <div v-if="current.weather" class="bg-white shadow-lg my-4 rounded-lg w-3/4 pb-4 mx-auto">
      <!-- aujourd'hui -->
      <div v-if="current" class="py-6">
        <div class="flex flex-col items-center">
          <div class="flex items-center justify-between">
            <weather-icon :id="current.weather[0].id"></weather-icon>
            <p class="leading-10 font-bold text-sm text-gray-800 text-center pl-1">{{ current.weather[0].description | capitalize }}</p>
          </div>
          <div class="">
            <p class="text-6xl font-bold text-purple-800 text-center pl-6">{{ current.main.temp | fahrenheit }}<span>°</span></p>
            <p class="text-sm font-bold text-gray-800 text-center text-xl">{{ current.name }}</p>
          </div>
        </div>
      </div>

      <!-- prévisions -->
      <ul v-if="forecasts.length > 0" class="flex justify-around w-full">
        <li v-for="(forecast, index) in forecasts" :key="`forecast-${index}`" class="flex flex-col items-center">
          <weather-icon :id="forecast.weather[0].id"></weather-icon>
          <small class="font-bold text-gray-800">{{ $moment.unix(forecast.dt).format('LT') }}</small>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WeatherIcon from './WeatherIcon.vue';

export default {
  name: 'weather',
  components: {
    WeatherIcon,
  },
  computed: {
    ...mapGetters({
      current: 'weatherModule/getCurrent',
      forecasts: 'weatherModule/getForecasts',
      status: 'weatherModule/getStatus',
    }),
  },
  mounted() {
    this.$store.dispatch('weatherModule/updateWeather');
  },
};
</script>

<style lang="scss" scoped>

</style>
