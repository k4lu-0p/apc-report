<template>
<!-- eslint-disable max-len -->
  <!-- Main -->
  <div class="container">
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
      <div
        v-else-if="status === $const.API.STATUS.LOADING"
        class="fixed w-screen flex flex-col justify-center items-center h-screen"
      >
        <moon-loader :color="$const.MISC.SPINNER.COLOR"></moon-loader>
      </div>
      <div v-else class="absolute top-45 flex flex-col justify-center items-center">
        <p class="text-gray-500 text-center px-10">{{ $t('page.appointments.empty') }}</p>
      </div>
    </transition>

    <float-add-button @onTap="$router.push({ name: $const.NAVIGATION.APPOINTMENTS_CREATE.NAME })" />
  </div>
</template>

<script>
import AppointmentItem from '../../components/Appointments/AppointmentItem.vue';
import FloatAddButton from '../../components/Buttons/FloatAddButton.vue';

export default {
  name: 'appointments-page',
  components: {
    AppointmentItem,
    FloatAddButton,
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
  mounted() {
    this.$store.dispatch('appointmentsModule/fetchAppointments').then(() => {
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
