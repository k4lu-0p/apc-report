<template>
  <div class="container mx-auto px-4">
    <!-- top bar -->
    <top-bar :has-back-button="true"></top-bar>

    <!-- edit report -->
    <edit-report-form
      v-if="report"
      :survey="survey"
      :report="report"
      :status="status"
      @submit="handleSubmitResponses($event)"
    ></edit-report-form>
  </div>
</template>

<script>
import EditReportForm from '../../components/Forms/EditReportForm.vue';
import TopBar from '../../components/Navigators/TopBar.vue';

export default {
  name: 'reports-edit',
  components: {
    EditReportForm,
    TopBar,
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
    report() {
      return this.$store.getters['reportsModule/getReportById'](this.$route.params.id);
    },
    survey() {
      return this.$store.getters['settingsModule/getSurvey'];
    },
    status() {
      return this.$store.getters['reportsModule/getStatus'];
    },
  },
  mounted() {
    if (!this.$route.params.id) {
      this.$router.go(-1);
    }
  },
};

</script>

<style>

</style>
