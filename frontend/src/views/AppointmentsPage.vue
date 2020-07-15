<template>
  <!-- Main -->
  <div class="container">
    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
      mode="out-in"
    >
      <transition-group v-if="appointments" tag="ul">
        <li v-for="appointment in appointments" :key="appointment.id">
          <appointment-item :appointment="appointment"/>
        </li>
      </transition-group>
      <div v-else class="flex justify-center items-center h-screen w-screen">
        <moon-loader :color="$const.MISC.SPINNER.COLOR"></moon-loader>
      </div>
    </transition>
  </div>
</template>

<script>
import AppointmentItem from '@/components/Appointments/AppointmentItem.vue';

export default {
  name: 'appointments-page',
  components: {
    AppointmentItem,
  },
  computed: {
    appointments: {
      get() {
        return this.$store.getters['appointmentsModule/getAppointments'];
      },
    },
  },
  mounted() {
    if (!this.appointments && !this.appointments.length) {
      this.$store.dispatch('appointmentsModule/fetchAppointments').then(() => {
        // Handle invalid token even if user is authenticated
        if (this.$store.getters['appointmentsModule/getStatus'] === this.$const.API.STATUS.UNAUTHORIZED) {
          this.$store.dispatch('authModule/logout').then(() => {
            this.$router.push({ path: '/login' });
          });
        }
      });
    }
  },
};
</script>
