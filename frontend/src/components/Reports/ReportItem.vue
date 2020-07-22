<template>
<!-- eslint-disable max-len -->
  <div v-if="report.id" class="w-5/6 mx-auto bg-white shadow-xl rounded my-4">
    <div class="px-6">
      <div class="flex justify-start items-center py-4">
        <clock-icon class="clock-icon"></clock-icon>
        <p class="text-gray-500 pl-2 text-sm">{{ $moment(report.appointment_start_at).calendar() }}</p>
      </div>

      <h2 class="font-bold text-2xl text-left">{{ report.customer_name }}</h2>
      <p class="py-6 font-medium">{{ report.appointment_title }}</p>

      <!-- chips -->
      <hr>
      <div class="flex flex-wrap py-4">
        <p v-if="report.is_complete === 0" class="mr-2 text-xs leading-none px-2 py-1 rounded-full bg-orange-300 border border-orange-500 text-orange-500 font-medium">À compléter</p>
        <p v-else class="mr-2 text-xs leading-none px-2 py-1 rounded-full bg-green-300 border border-green-500 text-green-500 font-medium">Complété</p>
        <p v-if="isAppointmentFinishToday" class="mr-2 text-xs leading-none px-2 py-1 rounded-full bg-teal-300 border border-teal-500 text-teal-500 font-medium">Aujourd'hui</p>
      </div>
    </div>

    <!-- buttons -->
    <div class="flex justify-between items-center">
      <button
        v-if="report.is_complete === 0"
        @click="goToEdit()"
        class="rounded-bl w-full text-center p-3 bg-teal-600 text-white border border-gray-200 text-lg font-medium"
      >
        Compléter
      </button>
      <button
        v-else
        @click="goToEdit()"
        class="rounded-bl w-full text-center p-3 bg-gray-200 border-gray-200 text-gray-600 border border-gray-200 text-lg font-medium"
      >
        Modifier
      </button>
    </div>
  </div>
</template>

<script>
import { IMAGES } from '../../constants';

const { svg: { ClockIcon } } = IMAGES;

export default {
  name: 'report-item',
  components: {
    ClockIcon,
  },
  props: {
    report: Object,
  },
  methods: {
    goToEdit() {
      this.$router.push({
        name: `${this.$const.NAVIGATION.REPORTS_EDIT.NAME}`,
        params: { id: this.report.id },
      });
    },
  },
  computed: {
    survey() {
      return JSON.parse(this.report.survey);
    },
    isAppointmentFinishToday() {
      return (
        this.$moment().format('YYYY-MM-DD') === this.$moment(this.report.appointment_finish_at).format('YYYY-MM-DD')
      );
    },
  },
  mounted() {
  },
};
</script>

<style lang="stylus">
.clock-icon
  width 15px
  height 15px
  fill theme('colors.gray.500')
  color theme('colors.gray.500')
</style>
