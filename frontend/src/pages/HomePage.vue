<template>
<!-- eslint-disable max-len -->
  <!-- Main -->
  <div>
    <div class="container mx-auto px-4">
      <transition
        mode="out-in"
        enter-active-class="animated fadeIn faster-x2"
        leave-active-class="animated fadeOut faster-x2"
      >
        <div v-if="status === $const.API.STATUS.SUCCESS">
          <weather-widget></weather-widget>
          <div class="py-6 bg-white shadow rounded w-full mx-auto">
            <h1 class="text-center font-bold text-gray-800 text-2xl">Bienvenue sur APC Report</h1>
          </div>
          <div>
            <div class="text-center font-medium text-lg bg-white shadow my-2 rounded w-full py-6 mx-auto">
              <p class="text-xl text-gray-800 text-center pb-3">Bonjour, <strong class="text-yellow-750">{{ username }}</strong>.</p>
              <p class="">Vous avez <span class="font-bold text-xl text-purple-800">{{ appointments.length }}</span> rendez-vous de programmé(s), aujourd’hui. Bonne journée et bonne route !</p>
            </div>
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
  </div>
</template>

<script>
import WeatherWidget from '../components/Weather/WeatherWidget.vue';
import AppointmentItem from '../components/Appointments/AppointmentItem.vue';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'home-page',
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
        period: 'current_day',
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
    if (this.status !== this.$const.API.STATUS.LOADING) {
      this.$store.dispatch('appointmentsModule/fetchAppointments', this.params).then(() => {
        // Handle invalid token even if user is authenticated
        if (this.$store.getters['appointmentsModule/getStatus'] === this.$const.API.STATUS.UNAUTHORIZED) {
          this.$store.dispatch('authModule/logout').then(() => {
            this.$router.push({ name: this.$const.NAVIGATION.LOGIN_PAGE.NAME });
          });
        }
      });
    }
  },
};
</script>
