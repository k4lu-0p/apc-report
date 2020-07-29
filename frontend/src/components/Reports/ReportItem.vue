<template>
<!-- eslint-disable max-len -->
  <div
    v-if="report.id"
    class="bg-white shadow-lg my-4 rounded-lg"
    @click="goToSurvey()"
  >
    <div class="px-6">

      <!-- header -->
      <div class="flex justify-between items-center py-2">
        <div class="flex justify-start items-center">
          <clock-icon class="clock-icon"></clock-icon>
          <p class="text-gray-500 pl-2 text-xs">
            {{ $moment(report.appointment_start_at).calendar() }}
          </p>
        </div>
        <div class="flex justify-start items-center">
          <users-icon class="users-icon"></users-icon>
          <p class="text-gray-500 pl-2 text-xs">
            {{ report.customer_name }}
          </p>
        </div>
      </div>

      <!-- chips -->
      <hr>
      <div class="flex flex-wrap py-4">
        <p
          v-if="report.is_complete === 0"
          class="mr-2 text-xs leading-none px-2 py-1 rounded-full border border-teal-600 bg-teal-600 text-white font-medium flex items-center">
          <warning-icon class="warning-icon mr-1"></warning-icon>
          <span>À compléter</span>
        </p>

        <p
          v-else
          class="mr-2 text-xs leading-none px-2 py-1 rounded-full border border-teal-150 text-teal-150 font-medium flex items-center">
          <accept-icon class="accept-icon2 mr-1"></accept-icon>
          <span>Complété</span>
        </p>

        <p
          v-if="isAppointmentFinishToday"
          class="mr-2 text-xs leading-none px-2 py-1 rounded-full border border-teal-150 text-teal-150 font-medium">
          Aujourd'hui
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { IMAGES } from '../../constants';

const {
  svg: {
    ClockIcon,
    UsersIcon,
    AcceptIcon,
    WarningIcon,
  },
} = IMAGES;

export default {
  name: 'report-item',
  components: {
    ClockIcon,
    UsersIcon,
    AcceptIcon,
    WarningIcon,
  },
  props: {
    report: Object,
  },
  methods: {
    goToSurvey() {
      if (this.report.is_complete === 0) {
        this.$router.push({
          name: this.$const.NAVIGATION.REPORTS_EDIT.NAME,
          params: { id: this.report.id },
        });
      }
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
};
</script>

<style lang="stylus">
.clock-icon, .users-icon
  width 15px
  height 15px
  fill theme('colors.gray.500')
  color theme('colors.gray.500')

.accept-icon2
  width 15px
  height 15px
  fill theme('colors.teal.150')
  color theme('colors.teal.150')
</style>
