<template>
  <div class="min-h-screen">
    <!-- top bar -->
    <top-bar :has-search-input="false" ></top-bar>

    <!-- Main -->
    <div class="container mx-auto px-4">
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
        <spinner v-else-if="status === $const.API.STATUS.LOADING" :is-visible="true"></spinner>
        <div v-else class="absolute top-45 left-0 flex flex-col justify-center items-center">
          <p class="text-gray-500 text-center px-10">{{ $t('page.reports.empty') }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ReportItem from '../../components/Reports/ReportItem.vue';
import TopBar from '../../components/Navigators/TopBar.vue';
import Spinner from '../../components/Spinner.vue';

export default {
  name: 'reports-page',
  components: {
    ReportItem,
    TopBar,
    Spinner,
  },
  data() {
    return {
      params: {
        limit: 10,
        offset: 0,
      },
    };
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
    this.$store.dispatch('reportsModule/fetchReports', this.params).then(() => {
      // Handle invalid token even if user is authenticated
      if (this.$store.getters['reportsModule/getStatus'] === this.$const.API.STATUS.UNAUTHORIZED) {
        this.$store.dispatch('authModule/logout').then(() => {
          this.$router.push({ name: this.$const.NAVIGATION.LOGIN_INDEX.NAME });
        });
      }
    });
  },
};
</script>
