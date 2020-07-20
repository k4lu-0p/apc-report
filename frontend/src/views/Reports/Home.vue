<template>
  <!-- Main -->
  <div class="container">
    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
      mode="out-in"
    >
      <transition-group v-if="reports && reports.length" tag="ul">
        <li v-for="report in reports" :key="report.id">
          <report-item :report="report"/>
        </li>
      </transition-group>
      <div
        v-else-if="status === $const.API.STATUS.LOADING"
        class="fixed w-screen flex flex-col justify-center items-center h-screen"
      >
        <moon-loader :color="$const.MISC.SPINNER.COLOR"></moon-loader>
      </div>
       <div v-else class="absolute top-45 flex flex-col justify-center items-center">
        <p class="text-gray-500 text-center px-10">{{ $t('page.reports.empty') }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import ReportItem from '../../components/Reports/ReportItem.vue';

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
    status() {
      return this.$store.getters['reportsModule/getStatus'];
    },
  },
  mounted() {
    if (this.reports.length === 0) {
      this.$store.dispatch('reportsModule/fetchReports').then(() => {
        // Handle invalid token even if user is authenticated
        if (this.$store.getters['reportsModule/getStatus'] === this.$const.API.STATUS.UNAUTHORIZED) {
          this.$store.dispatch('authModule/logout').then(() => {
            this.$router.push({ path: '/login' });
          });
        }
      });
    }
  },
};
</script>
