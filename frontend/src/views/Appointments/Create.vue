<template>
  <div class="container">
    <!-- top bar -->
    <top-bar has-back-button ></top-bar>

    <!-- form -->
    <create-appointment-form
      @submit="handleSubmit($event)"
    ></create-appointment-form>

    <!-- modal -->
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn faster-x2"
      leave-active-class="animated fadeOut faster-x2"
    >
      <confirm-appointment-modal
        v-if="isConfirmModalOpen"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      ></confirm-appointment-modal>
    </transition>
  </div>
</template>

<script>
import TopBar from '../../components/Navigators/TopBar.vue';
import CreateAppointmentForm from '../../components/Forms/CreateAppointmentForm.vue';
import ConfirmAppointmentModal from '../../components/Modals/ConfirmAppointmentModal.vue';

export default {
  name: 'appointments-create',
  components: {
    TopBar,
    CreateAppointmentForm,
    ConfirmAppointmentModal,
  },
  data() {
    return {
      isConfirmModalOpen: false,
    };
  },
  methods: {
    handleSubmit(form) {
      this.$store.dispatch('appointmentsModule/storeAppointment', form).then(() => {
        this.isConfirmModalOpen = true;
      });
    },
    handleConfirm() {
      this.isConfirmModalOpen = false;
      // redirect to report survey form
      this.$router.push({
        name: this.$const.NAVIGATION.REPORTS_EDIT.NAME,
        params: { id: this.lastReport.id },
      });
    },
    handleCancel() {
      this.isConfirmModalOpen = false;
      this.$router.push({ name: this.$const.NAVIGATION.APPOINTMENTS_HOME.NAME });
    },
    openConfirmModal() {
      this.isConfirmModalOpen = true;
    },
  },
  computed: {
    lastReport() {
      return this.$store.getters['reportsModule/getLastReport'];
    },
  },
};
</script>

<style>

</style>
