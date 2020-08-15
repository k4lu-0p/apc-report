<template>
<!-- eslint-disable max-len -->
  <div class="min-h-screen bg-white">
    <!-- top bar -->
    <top-bar has-back-button ></top-bar>
    <div class="container mx-auto px-8">

      <!-- form -->
      <create-appointment-form @submit="handleSubmit($event)" />

    </div>
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
      />
    </transition>
  </div>
</template>

<script>
import TopBar from '../../components/Navigators/TopBar.vue';
import CreateAppointmentForm from '../../components/Forms/CreateAppointmentForm.vue';
import AlertModal from '../../components/Modals/AlertModal.vue';

export default {
  name: 'create-appointment-page',
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
      });
    },
    handleCancel() {
      this.isConfirmModalOpen = false;
      this.$router.push({ name: this.$const.NAVIGATION.LIST_APPOINTMENT_PAGE.NAME });
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
