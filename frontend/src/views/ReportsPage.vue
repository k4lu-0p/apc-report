<template>
  <!-- Main -->
  <div class="">
    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
      mode="out-in"
    >
      <transition-group v-if="reports" tag="ul">
        <li v-for="report in reports" :key="report.id">
          <report-item :report="report"/>
        </li>
      </transition-group>
      <div v-else class="flex justify-center items-center h-screen w-screen">
        <moon-loader :color="$const.MISC.SPINNER.COLOR"></moon-loader>
      </div>
    </transition>
  </div>
</template>

<script>
import ReportItem from '@/components/Reports/ReportItem.vue';

export default {
  name: 'reports-page',
  components: {
    ReportItem,
  },
  computed: {
    reports: {
      get() {
        return this.$store.getters['reportsModule/getReports'];
      },
    },
  },
  mounted() {
    if (!this.reports && !this.reports.length) {
      this.$store.dispatch('reportsModule/fetchReports');
    }
  },
};
</script>
