<template>
<!-- eslint-disable max-len -->
  <!-- Main -->
  <div class="min-h-screen">
    <top-bar></top-bar>
    <div class="container mx-auto px-4">
      <transition
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster"
        mode="out-in"
      >
        <transition-group v-if="appointments && appointments.length" tag="ul">
          <li v-for="appointment in appointments" :key="appointment.id">
            <appointment-item :appointment="appointment"/>
          </li>
        </transition-group>
        <spinner v-else-if="status === $const.API.STATUS.LOADING" :is-visible="true"></spinner>
        <div v-else class="absolute top-45 left-0 flex flex-col justify-center items-center">
          <p class="text-gray-500 text-center px-10">{{ $t('page.appointments.empty') }}</p>
        </div>
      </transition>

      <float-add-button @onTap="$router.push({ name: $const.NAVIGATION.APPOINTMENTS_CREATE.NAME })" />
    </div>
  </div>
</template>

<script>
import AppointmentItem from '../../components/Appointments/AppointmentItem.vue';
import FloatAddButton from '../../components/Buttons/FloatAddButton.vue';
import TopBar from '../../components/Navigators/TopBar.vue';
import Spinner from '../../components/Spinner.vue';

export default {
  name: 'appointments-page',
  components: {
    AppointmentItem,
    FloatAddButton,
    TopBar,
    Spinner,
  },
  data() {
    return {
      params: {
        limit: 10,
        offset: 0,
      },
    };
  },
  computed: {
    appointments: {
      get() {
        return this.$store.getters['appointmentsModule/getAppointments'];
      },
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
