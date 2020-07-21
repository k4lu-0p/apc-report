<template>
  <div class="container">
    <!-- top bar -->
    <top-bar></top-bar>

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
      // eslint-disable-next-line no-alert
      window.alert('Désolé mais la partie reporting est actuellement en cours de développement.');
      this.isConfirmModalOpen = false;
      this.$router.push({ name: this.$const.NAVIGATION.APPOINTMENTS_HOME.NAME });
    },
    handleCancel() {
      this.isConfirmModalOpen = false;
      this.$router.push({ name: this.$const.NAVIGATION.APPOINTMENTS_HOME.NAME });
    },
    openConfirmModal() {
      this.isConfirmModalOpen = true;
    },
  },
};
</script>

<style>

</style>
