<template>
<!-- eslint-disable max-len -->
  <div>
    <div v-if="status === $const.API.STATUS.SUCCESS" class="bg-white shadow-lg my-4 rounded-lg w-3/4 py-4 mx-auto">

      <!-- aujourd'hui -->
      <div v-if="current" class="px-10 py-6">
        <div class="flex flex-col items-center">
          <div class="flex items-center justify-between">
            <weather-icon :id="current.weather[0].id"></weather-icon>
            <p class="font-bold text-sm text-gray-800 text-center pl-1">{{ current.weather[0].description | capitalize }}</p>
          </div>
          <p class="text-6xl font-bold text-teal-600 text-center pl-6 -my-4">{{ current.main.temp | fahrenheit }}<span>°</span></p>
          <p class="text-sm font-bold text-gray-800 text-center">{{ current.name }}</p>
        </div>
      </div>

      <!-- prévisions -->
      <ul v-if="forecasts.length > 0" class="flex justify-around w-full">
        <li v-for="(forecast, index) in forecasts" :key="`forecast-${index}`" class="flex flex-col items-center">
          <weather-icon :id="forecast.weather[0].id"></weather-icon>
          <small class="font-bold">{{ $moment.unix(forecast.dt).format('LT') }}</small>
        </li>
      </ul>
      <div>

      </div>
    </div>
    <div v-else class="">
      <img src="spinner.svg" alt="">
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
    this.$store.dispatch('weatherModule/updateWeather').then(() => {
      console.log(this.forecasts);
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
