<template>
  <div class="container mx-auto px-4">
    <!-- top bar -->
    <top-bar></top-bar>

    <!-- edit report -->
    <edit-report-form
      v-if="report"
      :reponses="reportResponses"
      :appointmentStart="reportStartDate"
      :appointmentFinish="reportFinishDate"
      :appointmentTitle="report.appointment_title"
      :customerName="report.customer_name"
      @submit="handleSubmitSurvey($event)"
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
    handleSubmitSurvey(survey) {
      console.log(survey);
    },
  },
  computed: {
    report() {
      const reports = this.$store.getters['reportsModule/getReports'];
      return reports.find((report) => report.id === this.$route.params.id);
    },
    reportResponses() {
      return JSON.parse(this.report.responses);
    },
    reportStartDate() {
      return this.$moment(this.report.appointment_start_at);
    },
    reportFinishDate() {
      return this.$moment(this.report.appointment_finish_at);
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
