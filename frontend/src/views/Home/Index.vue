<template>
  <!-- Main -->
  <div class="container mx-auto px-4">
    <weather-widget></weather-widget>
  </div>
</template>

<script>
import WeatherWidget from '../../components/Weather/WeatherWidget.vue';

export default {
  name: 'home-index',
  components: {
    WeatherWidget,
  },
};
</script>
