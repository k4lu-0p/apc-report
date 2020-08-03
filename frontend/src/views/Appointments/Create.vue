<template>
<!-- eslint-disable max-len -->
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
        <alert-modal
          title="Rendez-vous créé !"
          message="Un rapport associé au rendez-vous est également créé. Vous serez en mesure de le remplir uniquement à partir de la date de fin du rendez-vous."
          type="success"
          v-if="isConfirmModalOpen"
          @cancel="handleCancel"
        ></alert-modal>
      </transition>
    </div>
  </div>
</template>

<script>
import TopBar from '../../components/Navigators/TopBar.vue';
import CreateAppointmentForm from '../../components/Forms/CreateAppointmentForm.vue';
import AlertModal from '../../components/Modals/AlertModal.vue';

export default {
  name: 'appointments-create',
  components: {
    TopBar,
    CreateAppointmentForm,
    AlertModal,
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
