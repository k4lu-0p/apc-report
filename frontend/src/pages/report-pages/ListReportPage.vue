<template>
<!-- eslint-disable max-len -->
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
            <report-item
              :report="report"
              @alert="handleOpenAlertModal"
            />
          </li>
        </transition-group>
        <spinner v-else-if="status === $const.API.STATUS.LOADING" :is-visible="true"></spinner>
        <div v-else class="absolute top-45 left-0 flex flex-col justify-center items-center">
          <p class="text-gray-500 text-center px-10">{{ $t('page.reports.empty') }}</p>
        </div>
      </transition>
    </div>

    <!-- modal alert -->
    <transition
      enter-active-class="animated fadeIn faster-x2"
      leave-active-class="animated fadeOut faster-x2"
    >
      <alert-modal
        v-if="isAlertModalOpen"
        :title="alert.title"
        :message="alert.message"
        type="forbidden"
        @cancel="handleCancelAlertModal"
      ></alert-modal>
    </transition>
  </div>
</template>

<script>

import ReportItem from '../../components/Reports/ReportItem.vue';
import TopBar from '../../components/Navigators/TopBar.vue';
import Spinner from '../../components/Spinner.vue';
import AlertModal from '../../components/Modals/AlertModal.vue';

export default {
  name: 'list-report-page',
  components: {
    ReportItem,
    TopBar,
    Spinner,
    AlertModal,
  },
  data() {
    return {
      params: {
        limit: 10,
        offset: 0,
      },
      isAlertModalOpen: false,
      alert: {
        title: '',
        message: '',
      },
    };
  },
  methods: {
    handleOpenAlertModal(reportStatus) {
      if (reportStatus === 1) {
        this.alert.title = 'Rapport déjà envoyé !';
        this.alert.message = 'Vous avez déjà complété et envoyé ce rapport. Celui-ci ne peut plus être modifié.';
      } else {
        this.alert.title = 'Rendez-vous non terminé !';
        this.alert.message = 'Vous serez en mesure de le remplir uniquement à partir de la date de fin du rendez-vous.';
      }

      this.isAlertModalOpen = true;
    },
    handleCancelAlertModal() {
      this.isAlertModalOpen = false;
    },
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
  destroyed() {
    this.$store.commit('reportsModule/setReports', []);
  },
  mounted() {
    this.$store.dispatch('reportsModule/fetchReports', this.params).then(() => {
      // Handle invalid token even if user is authenticated
      if (this.$store.getters['reportsModule/getStatus'] === this.$const.API.STATUS.UNAUTHORIZED) {
        this.$store.dispatch('authModule/logout').then(() => {
          this.$router.push({ name: this.$const.NAVIGATION.LOGIN_PAGE.NAME });
        });
      }
    });
  },
};
</script>
