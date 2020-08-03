<template>
<!-- eslint-disable max-len -->
  <!-- Main -->
  <div class="container mx-auto px-4">
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn faster-x2"
      leave-active-class="animated fadeOut faster-x2"
    >
      <div v-if="status === $const.API.STATUS.SUCCESS">
        <weather-widget></weather-widget>
        <div class="py-6">
          <h1 class="text-center font-bold text-gray-800 text-2xl">Bienvenue sur APCReport</h1>
          <p class="text-gray-800 text-center">Bonjour, <strong class="text-teal-600">{{ username }}</strong>.</p>
        </div>
        <div>
          <p class="pb-6 text-center font-medium text-md">Vous avez <span class="font-bold text-teal-600">{{ appointments.length }}</span> rendez-vous de programmé(s), aujourd’hui. Bonne journée et bonne route !</p>
            <div>
              <appointment-item
                v-for="(appointment) in appointments"
                :key="`appointment-${appointment.id}`"
                :appointment="appointment">
              </appointment-item>
            </div>
        </div>
      </div>
      <spinner v-else-if="status === $const.API.STATUS.LOADING" :is-visible="true"></spinner>
    </transition>
  </div>
</template>

<script>
import WeatherWidget from '../../components/Weather/WeatherWidget.vue';
import AppointmentItem from '../../components/Appointments/AppointmentItem.vue';
import Spinner from '../../components/Spinner.vue';

export default {
  name: 'home-index',
  components: {
    WeatherWidget,
    AppointmentItem,
    Spinner,
  },
  data() {
    return {
      params: {
        limit: 10,
        offset: 0,
        by: 'start_at',
        value: this.$moment().format('YYYY-MM-DD'),
      },
    };
  },
  computed: {
    username() {
      return this.$store.getters['authModule/getUser'].name;
    },
    appointments() {
      return this.$store.getters['appointmentsModule/getAppointments'];
    },
    status() {
      return this.$store.getters['appointmentsModule/getStatus'];
    },
  },
  destroyed() {
    this.$store.commit('appointmentsModule/setAppointments', []);
  },
  mounted() {
    this.$store.dispatch('appointmentsModule/fetchAppointments', this.params).then(() => {
      // Handle invalid token even if user is authenticated
      if (this.$store.getters['appointmentsModule/getStatus'] === this.$const.API.STATUS.UNAUTHORIZED) {
        this.$store.dispatch('authModule/logout').then(() => {
          this.$router.push({ name: this.$const.NAVIGATION.LOGIN_INDEX.NAME });
        });
      }
    });
  },
};
</script>
