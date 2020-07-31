<template>
  <div class="min-h-screen bg-white">
    <!-- top bar -->
    <top-bar has-back-button ></top-bar>
    <div class="container">

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
          @cancel="handleCancel"
        ></confirm-appointment-modal>
      </transition>
    </div>
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
      newAppointmentCreated: null,
    };
  },
  methods: {
    handleSubmit(form) {
      this.$store.dispatch('appointmentsModule/storeAppointment', form).then((newAppointmentCreated) => {
        this.isConfirmModalOpen = true;
        this.newAppointmentCreated = newAppointmentCreated;
        console.log(newAppointmentCreated);
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
