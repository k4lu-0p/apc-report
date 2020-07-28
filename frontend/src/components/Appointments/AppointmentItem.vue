<template>
<!-- eslint-disable max-len -->
  <div v-if="appointment" class="bg-white shadow-md my-4 rounded-lg">
    <div class="px-6">
       <div class="flex justify-between items-center py-2">
        <div class="flex justify-start items-center">
          <clock-icon class="clock-icon"></clock-icon>
          <p class="text-gray-500 pl-2 text-xs">
            {{ $moment(appointment.start_at).calendar() }}
          </p>
        </div>
        <div class="flex justify-start items-center">
          <users-icon class="users-icon"></users-icon>
          <p class="text-gray-500 pl-2 text-xs">
            {{ appointment.customer.name }}
          </p>
        </div>
      </div>

      <p class="py-4 font-medium text-gray-800">
        {{ appointment.title }}
      </p>

      <!-- chips -->
      <hr>
      <div class="flex flex-wrap py-4">
        <!-- <p v-if="report.is_complete === 0" class="mr-2 text-xs leading-none px-2 py-1 rounded-full border border-orange-500 text-orange-500 font-medium">À compléter</p>
        <p v-else class="mr-2 text-xs leading-none px-2 py-1 rounded-full border border-green-500 text-green-500 font-medium">Complété</p> -->
        <p v-if="isAppointmentFinishToday" class="mr-2 text-xs leading-none px-2 py-1 rounded-full border border-teal-500 text-teal-500 font-medium">Aujourd'hui</p>
      </div>
    </div>

    <!-- buttons -->
    <div class="flex justify-between items-center">
      <button
        @click="goToSurvey($event)"
        class="rounded-bl-lg w-1/2 text-center p-3 bg-gray-200 border-white text-gray-600 border-l-4 border-t-4 border-b-4 border-r-2 text-md font-bold"
      >
        {{ textButtonSurvey }}
      </button>
      <button
        @click="goToDetail($event)"
        class="rounded-br-lg w-1/2 text-center p-3 bg-teal-600 border-white text-white border-r-4 border-t-4 border-b-4 border-l-2 text-md font-bold"
      >
        Détail
      </button>
    </div>
  </div>
</template>

<script>
import { IMAGES } from '../../constants';

const { svg: { ClockIcon, UsersIcon } } = IMAGES;

export default {
  name: 'appointment-item',
  components: {
    ClockIcon,
    UsersIcon,
  },
  props: {
    appointment: Object,
  },
  methods: {
    goToSurvey() {
      this.$router.push({
        name: this.$const.NAVIGATION.REPORTS_EDIT.NAME,
        params: { id: this.appointment.report.id },
      });
    },
    goToDetail() {
      this.$router.push({
        name: this.$const.NAVIGATION.APPOINTMENTS_SHOW.NAME,
        params: { id: this.appointment.id },
      });
    },
  },
  computed: {
    location() {
      return JSON.parse(this.appointment.location);
    },
    textButtonSurvey() {
      if (this.appointment.report.is_complete === 1) {
        return 'Modifier rapport';
      }
      return 'Saisir rapport';
    },
    isAppointmentFinishToday() {
      return (
        this.$moment().format('YYYY-MM-DD') === this.$moment(this.appointment.finish_at).format('YYYY-MM-DD')
      );
    },
  },
};
</script>

<style>

</style>
