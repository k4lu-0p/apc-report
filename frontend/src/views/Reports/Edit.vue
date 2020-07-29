<template>
  <div class="min-h-screen bg-white">
    <top-bar :has-back-button="true"></top-bar>
    <div class="container mx-auto px-4">

      <edit-report-form
        v-if="report"
        :survey="survey"
        :report="report"
        :status="status"
        @submit="handleSubmitResponses($event)"
      ></edit-report-form>

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

export default {
  name: 'reports-edit',
  data() {
    return {
      report: null,
    };
  },
  components: {
    EditReportForm,
    TopBar,
    Spinner,
  },
  methods: {
    handleSubmitResponses(responses) {
      this.$store.dispatch('reportsModule/putReport', {
        id: this.$route.params.id,
        responses: JSON.stringify(responses),
      }).then(() => this.$router.push({ name: this.$const.NAVIGATION.REPORTS_HOME.NAME }));
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
      const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.FETCH_REPORT}${this.$route.params.id}`;
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
