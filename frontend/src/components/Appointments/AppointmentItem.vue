<template>
<!-- eslint-disable max-len -->
  <div
    @click="goTo($const.NAVIGATION.APPOINTMENTS_SHOW.NAME, appointment.id)"
    v-if="appointment" class="bg-white shadow-lg my-4 rounded-lg"
  >
    <div class="px-6">
       <div class="flex justify-between items-center py-2">
        <div class="flex justify-start items-center">
          <clock-icon class="clock-icon"></clock-icon>
          <p class="text-gray-500 pl-2 text-xs">
            {{ $moment(appointment.start_at).calendar() }}
          </p>
        </div>
        <div class="flex justify-start items-center">
          <location-icon class="location-icon"></location-icon>
          <p class="text-gray-500 pl-2 text-xs">
            {{ location.address.city }}
          </p>
        </div>
      </div>

      <p class="py-4 font-bold text-lg text-gray-800">{{ appointment.customer.commercial_name }}</p>

      <!-- chips -->
      <hr>
      <div class="flex flex-wrap py-4">
        <p
          @click.stop="goTo($const.NAVIGATION.REPORTS_EDIT.NAME, appointment.id)"
          v-if="appointment.report.is_complete === 0 && isAppointmentOver"
          class="mr-2 text-xs leading-none px-2 py-1 rounded-full border border-teal-600 bg-teal-600 text-white font-medium flex items-center">
          <warning-icon class="warning-icon mr-1"></warning-icon>
          <span>
            Rapport à compléter
          </span>
        </p>

        <p
           v-if="appointment.report.is_complete"
          class="mr-2 text-xs leading-none px-2 py-1 rounded-full border border-teal-150 text-teal-150 font-medium flex items-center">
          <accept-icon class="accept-icon2 mr-1"></accept-icon>
          <span>
            Rapport complété
          </span>
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
import { ICONS } from '../../constants';

const {
  common: {
    ClockIcon,
    LocationIcon,
    WarningIcon,
    AcceptIcon,
  },
} = ICONS;

export default {
  name: 'appointment-item',
  components: {
    ClockIcon,
    LocationIcon,
    WarningIcon,
    AcceptIcon,
  },
  props: {
    appointment: Object,
  },
  computed: {
    location() {
      return JSON.parse(this.appointment.location);
    },
    isAppointmentFinishToday() {
      return (
        this.$moment().format('YYYY-MM-DD') === this.$moment(this.appointment.finish_at).format('YYYY-MM-DD')
      );
    },
    isAppointmentOver() {
      return (
        this.$moment().format('YYYY-MM-DD, h:mm:ss') > this.$moment(this.appointment.finish_at).format('YYYY-MM-DD, h:mm:ss')
      );
    },
  },
};
</script>

<style lang="stylus">
  .location-icon
    height 14px
    width 14px
    fill theme('colors.gray.500')
    color theme('colors.gray.500')

  .warning-icon
    height 14px
    width 14px
    fill theme('colors.white')
    color theme('colors.white')
</style>
