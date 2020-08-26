<template>
  <div class="min-h-screen bg-white">
    <!-- topbar -->
    <top-bar>
      <back-button slot="left"/>
    </top-bar>

    <!-- main -->
    <div class="container mx-auto px-4">

      <!-- form -->
      <edit-report-form
        v-if="report"
        :survey="survey"
        :report="report"
        :status="status"
        @submit="handleSubmitResponses($event)"
      ></edit-report-form>

      <!-- spinner -->
      <spinner
        :is-visible="report === null"
      ></spinner>

    </div>
  </div>
</template>

<script>
import EditReportForm from '../../components/Forms/EditReportForm.vue';
import TopBar from '../../components/Navigators/TopBar.vue';
import Spinner from '../../components/Spinner.vue';
import BackButton from '../../components/Buttons/BackButton.vue';

export default {
  name: 'edit-report-page',
  data() {
    return {
      report: null,
    };
  },
  components: {
    EditReportForm,
    TopBar,
    Spinner,
    BackButton,
  },
  methods: {
    handleSubmitResponses(responses) {
      this.$store.dispatch('reportsModule/putReport', {
        id: this.$route.params.id,
        responses: JSON.stringify(responses),
      }).then(() => this.$router.push({ name: this.$const.NAVIGATION.LIST_REPORT_PAGE.NAME }));
    },
  },
  computed: {
    survey() {
      return this.$store.getters['settingsModule/getSurvey'];
    },
    status() {
      return this.$store.getters['reportsModule/getStatus'];
    },
    token() {
      return this.$store.getters['authModule/getToken'];
    },
  },
  async mounted() {
    if (!this.$route.params.id) {
      this.$router.go(-1);
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.APC_REPORT.FETCH_REPORT}${this.$route.params.id}`;
      const { data: { data: report } } = await this.$axios.get(endpoint, config);
      if (report !== undefined) {
        this.report = report;
      }
    }
  },
};

</script>

<style>

</style>
