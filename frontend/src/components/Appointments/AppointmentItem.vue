<template>
<!-- eslint-disable max-len -->
  <div
    @click="goTo($const.NAVIGATION.SHOW_APPOINTMENT_PAGE.NAME, appointment.id)"
    :class="[appointment.report.is_complete ? 'border-yellow-750' : 'border-purple-800']"
    v-if="appointment" class="border-l-2 bg-white shadow-lg mb-4 rounded-r"
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

      <p class="py-4 font-medium text-lg text-gray-800">{{ appointment.customer.commercial_name }}</p>

      <!-- chips -->
      <hr>
      <div class="flex flex-wrap py-2">
        <p
          @click.stop="goTo($const.NAVIGATION.EDIT_REPORT_PAGE.NAME, appointment.id)"
          v-if="appointment.report.is_complete === 0 && isAppointmentOver"
          class="cursor-pointer my-1 mr-2 text-xs px-2 py-1/2 rounded shadow border border-purple-800 bg-purple-800 text-white font-medium flex items-center">
          <warning-icon class="warning-icon mr-1"></warning-icon>
          <span>
            Compléter le rapport
          </span>
        </p>

        <p
           v-if="appointment.report.is_complete"
          class="my-1 mr-2 text-xs px-2 py-1/2 rounded-full border border-yellow-750 text-yellow-750 font-medium flex items-center">
          <accept-icon class="accept-icon2 mr-1"></accept-icon>
          <span>
            Rapport complété
          </span>
        </p>

        <p
          v-if="isAppointmentFinishToday"
          class="my-1 mr-2 text-xs px-2 py-1/2 rounded-full border border-purple-300 text-purple-300 font-medium">
          Aujourd'hui
        </p>

        <p
          v-if="appointment.customer.has_been_deleted"
          class="my-1 text-xs px-2 py-1/2 rounded-full border border-red-600 text-red-600 font-medium">
          <span>Partenaire supprimé</span>
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
