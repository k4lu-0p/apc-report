<template>
<!-- eslint-disable max-len -->
<!-- eslint-disable vue/no-unused-components  -->
  <div>
    <!-- 210 - 232 -->
    <cloud-cloudy-thunder-storm
      v-if="id >= 210 && id <= 232"
      class="weather-icon"
    ></cloud-cloudy-thunder-storm>

    <!-- 200 - 202 -->
    <cloud-heavy-rain-thunder-storm
      v-if="id >= 200 && id <= 202"
      class="weather-icon"
    ></cloud-heavy-rain-thunder-storm>

    <!-- 300 - 321 -->
    <cloud-drizzle-rain
      v-if="id >= 300 && id <= 321"
      class="weather-icon"
    ></cloud-drizzle-rain>

    <!-- 500 - 511 -->
    <cloud-rain
      v-if="id >= 500 && id <= 511"
      class="weather-icon"
    ></cloud-rain>

    <!-- 520 - 531 -->
    <cloud-heavy-rain
      v-if="id >= 520 && id <= 531"
      class="weather-icon"
    ></cloud-heavy-rain>

    <!-- 600 - 622 -->
    <cloud-winter
      v-if="id >= 600 && id <= 622"
      class="weather-icon"
    ></cloud-winter>

    <!-- 701 - 781 -->
    <cloud-fog
      v-if="id >= 701 && id <= 781"
      class="weather-icon"
    ></cloud-fog>

    <!-- 800 -->
    <sun-sunny-hot
      v-if="id === 800"
      class="weather-icon"
    ></sun-sunny-hot>

    <!-- 801 -->
    <sun-sunny-cloud
      v-if="id === 801"
      class="weather-icon"
    ></sun-sunny-cloud>

    <!-- 802 -->
    <cloud-cloudy-sun
      v-if="id === 802"
      class="weather-icon"
    ></cloud-cloudy-sun>

    <!-- 803 - 804 -->
    <cloud-cloudy
      v-if="id >= 803 && id <= 804"
      class="weather-icon"
    ></cloud-cloudy>
  </div>
</template>

<script>
import { ICONS } from '../../constants';

const {
  weather: {
    CloudCloudy,
    CloudCloudySun,
    CloudCloudyThunderStorm,
    CloudDrizzleRain,
    CloudFog,
    CloudHeavyRain,
    CloudHeavyRainThunderStorm,
    CloudHeavySnow,
    CloudNight,
    CloudRain,
    CloudSnow,
    CloudWinter,
    SunSunnyCloud,
    SunSunnyHot,
  },
} = ICONS;

export default {
  name: 'weather-icon',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CloudCloudy,
    // eslint-disable-next-line vue/no-unused-components
    CloudCloudySun,
    // eslint-disable-next-line vue/no-unused-components
    CloudCloudyThunderStorm,
    // eslint-disable-next-line vue/no-unused-components
    CloudDrizzleRain,
    // eslint-disable-next-line vue/no-unused-components
    CloudFog,
    // eslint-disable-next-line vue/no-unused-components
    CloudHeavyRain,
    // eslint-disable-next-line vue/no-unused-components
    CloudHeavyRainThunderStorm,
    // eslint-disable-next-line vue/no-unused-components
    CloudHeavySnow,
    // eslint-disable-next-line vue/no-unused-components
    CloudNight,
    // eslint-disable-next-line vue/no-unused-components
    CloudRain,
    // eslint-disable-next-line vue/no-unused-components
    CloudSnow,
    // eslint-disable-next-line vue/no-unused-components
    CloudWinter,
    // eslint-disable-next-line vue/no-unused-components
    SunSunnyCloud,
    // eslint-disable-next-line vue/no-unused-components
    SunSunnyHot,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="stylus">
  .weather-icon
    height 30px
    width 30px
    fill theme('colors.purple.800')
    color theme('colors.purple.800')
</style>
