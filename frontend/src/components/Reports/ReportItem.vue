<template>
<!-- eslint-disable max-len -->
  <div
    :ref="id"
    v-if="report.id"
    class="border-l-2 bg-white shadow mb-2 rounded-r border-purple-800"
    :class="[report.is_complete ? 'border-yellow-750' : 'border-purple-800']"
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
            {{ report.customer.commercial_name }}
          </p>
        </div>
      </div>

      <!-- chips -->
      <hr>
      <div class="flex flex-wrap py-2">
        <p
          v-if="report.is_complete === 0 && isAppointmentOver"
          class="my-1 mr-2 px-2 py-1/2 rounded-full border border-purple-800 bg-purple-800 text-white font-medium flex items-center">
          <warning-icon class="warning-icon mr-1"></warning-icon>
          <span>À compléter</span>
        </p>

        <p
          v-if="report.is_complete"
          class="my-1 mr-2 px-2 py-1/2 rounded-full border border-yellow-750 text-yellow-750 font-medium flex items-center">
          <accept-icon class="accept-icon2 mr-1"></accept-icon>
          <span>Complété</span>
        </p>

        <p
          v-if="isAppointmentFinishToday"
          class="my-1 mr-2 px-2 py-1/2 rounded-full border border-purple-300 text-purple-300 font-medium">
          Aujourd'hui
        </p>

        <p
          v-if="report.customer.has_been_deleted"
          class="my-1  text-xs px-2 py-1/2 rounded-full border border-red-600 text-red-600 font-medium">
          <span>Partenaire supprimé</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ICONS } from '../../constants';

const {
  common: {
    ClockIcon,
    UsersIcon,
    AcceptIcon,
    WarningIcon,
  },
} = ICONS;

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
    delayAnim: Number,
    id: String,
  },
  methods: {
    goToSurvey() {
      if (this.report.is_complete === 0 && this.isAppointmentOver) {
        this.$router.push({
          name: this.$const.NAVIGATION.EDIT_REPORT_PAGE.NAME,
          params: { id: this.report.id },
        });
      } else {
        this.$emit('alert', this.report.is_complete);
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
    isAppointmentOver() {
      return (
        this.$moment().format('YYYY-MM-DD, h:mm:ss') > this.$moment(this.report.appointment_finish_at).format('YYYY-MM-DD, h:mm:ss')
      );
    },
  },
  mounted() {
    const timeline = gsap.timeline({
      delay: this.delayAnim,
      defaults: {
        duration: 1,
        ease: 'power2',
      },
    });

    if (this.$refs[this.id]) {
      timeline.from(this.$refs[this.id], 1, { x: 300 });
      timeline.to(this.$refs[this.id], 1, { x: 0, rotation: 0 });
    }
  },
};
</script>

<style lang="stylus" scoped>
.clock-icon, .users-icon
  width 15px
  height 15px
  fill theme('colors.gray.500')
  color theme('colors.gray.500')

.accept-icon2
  width 15px
  height 15px
  fill theme('colors.yellow.750')
  color theme('colors.yellow.750')
</style>
