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
          <home-title />
          <div>
            <hello-card
              :appointments-length="appointments.length"
              :user-name="username"
            />
            <div>
              <appointment-item
                v-for="(appointment, index) in appointments"
                :key="`appointment-${appointment.id}`"
                :id="`appointment-${appointment.id}-${index}`"
                :delay-anim="index"
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
import HomeTitle from '../components/HomeTitle.vue';
import HelloCard from '../components/HelloCard.vue';

export default {
  name: 'home-page',
  components: {
    WeatherWidget,
    AppointmentItem,
    Spinner,
    HomeTitle,
    HelloCard,
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
  created() {
    if (this.status !== this.$const.API.STATUS.LOADING) {
      this.$store.dispatch('appointmentsModule/list', this.params).then(() => {
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
