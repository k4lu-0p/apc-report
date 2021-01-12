<template>
<!-- eslint-disable max-len -->
  <div class="min-h-screen">
    <!-- topbar -->
    <top-bar>
      <back-button slot="left"/>
      <delete-button slot="left"
        v-if="isAppointmentOver === false"
        @delete="isVisibleModal = true"/>
    </top-bar>

    <div class="container mx-auto px-4">

      <div v-if="appointment">

        <!-- partenaire, date et heure -->
        <div class="py-4">
          <h2 class="text-gray-800 text-center font-bold text-xl text-left p-6">Avec {{ appointment.customer.commercial_name }}</h2>
          <div class="flex flex-col">
            <div>
              <p class="font-bold py-1 px-4 text-gray-800 bg-gray-300 rounded-t text-left">
                {{ $moment(appointment.start_at).calendar(null, {
                  sameElse : 'DD/MM/YYYY',
                  sameDay: '[Aujourd\'hui]',
                  nextDay: '[Demain]',
                  lastDay: '[Hier]',
                }) }}
              </p>
            </div>
            <div :class="{'rounded-b-none': hasChangeHour}" class="relative flex justify-around items-center bg-gray-200 rounded p-6">

              <!-- loading overlay -->
              <transition
                mode="out-in"
                enter-active-class="animated fadeIn faster-x2"
                leave-active-class="animated fadeOut faster-x2"
              >
                <div
                  v-if="isUpdatingAppointment"
                  class="absolute w-full h-full bg-gray-200 flex items-center justify-center"
                >
                  <moon-loader
                    :color="$const.MISC.SPINNER.COLOR"
                    class="v-spinner-custom"
                  />
                </div>
              </transition>

              <p class="font-medium text-gray-800">De</p>
              <div class="flex flex-col datetime-start">
                <!-- input -->
                <datetime
                  format="HH:mm"
                  zone="local"
                  value-zone="local"
                  type="datetime"
                  input-id="startAt"
                  v-model="startAt"
                  @blur="$v.form.start_at.$touch()"
                  input-class="appearance-none border border-yellow-750 rounded w-16 h-16 font-bold text-lg text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  :phrases="{ok: 'Ok', cancel: 'Annuler'}"
                  :title="$t('form.appointment.date.start.label')"
                  :placeholder="$t('form.appointment.date.start.placeholder')"
                  :flow="['time']"
                >
                </datetime>
              </div>
              <p class="font-medium text-gray-800">à</p>
              <div class="flex flex-col datetime-finish">
                <datetime
                  format="HH:mm"
                  zone="local"
                  value-zone="local"
                  type="datetime"
                  input-id="finishAt"
                  v-model="finishAt"
                  @blur="$v.form.finish_at.$touch()"
                  input-class="appearance-none border border-yellow-750 rounded w-16 h-16 font-bold text-lg text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  :phrases="{ok: 'Ok', cancel: 'Annuler'}"
                  :title="$t('form.appointment.date.finish.label')"
                  :placeholder="$t('form.appointment.date.finish.placeholder')"
                  :flow="['time']"
                >
                </datetime>
              </div>
            </div>
            <transition mode="out-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
              <button
                :disabled="isUpdatingAppointment"
                @click="handleUpdateAppointment"
                v-if="hasChangeHour && this.$v.$invalid === false && isUpdatingAppointment === false"
                class="bg-yellow-750 text-white rounded-t-none  font-bold rounded px-4 py-2 block text-center">
                  Mettre à jour
              </button>
            </transition>
          </div>
        </div>

        <!-- lie du rendez-vous -->
        <div>
          <h2 class="font-bold text-lg text-gray-800">Lieu :</h2>
          <ul class="py-2">
            <li v-if="appointmentLocation.address.country"><span class="font-medium">Pays : </span>{{ appointmentLocation.address.country }}</li>
            <li v-if="appointmentLocation.address.state"><span class="font-medium">Région : </span>{{ appointmentLocation.address.state }}</li>
            <li v-if="appointmentLocation.address.county"><span class="font-medium">Département : </span>{{ appointmentLocation.address.county }}</li>
            <li v-if="appointmentLocation.address.postalCode"><span class="font-medium">Code postal : </span>{{ appointmentLocation.address.postalCode }}</li>
            <li v-if="appointmentLocation.address.city"><span class="font-medium">Ville : </span>{{ appointmentLocation.address.city }}</li>
            <li v-if="appointmentLocation.address.houseNumber"><span class="font-medium">Numéro : </span>{{ appointmentLocation.address.houseNumber }}</li>
            <li v-if="appointmentLocation.address.street"><span class="font-medium">Rue : </span>{{ appointmentLocation.address.street }}</li>
          </ul>
        </div>

        <!-- redirect to google map -->
        <a
          class="bg-yellow-750 text-white font-bold rounded px-4 py-2 block my-4 text-center border border-white"
          :href="queryGoogleMap"
          target="_blank">
          Itinéraire Google Map
        </a>
      </div>

      <spinner
        :is-visible="appointment === null"
      ></spinner>
    </div>

    <transition
      mode="out-in"
      enter-active-class="animated fadeIn faster-x2"
      leave-active-class="animated fadeOut faster-x2"
    >
      <!-- confirm delete -->
      <alert-modal
        v-if="isVisibleModal"
        type="dialog"
        title="Annuler le RDV ?"
        message="En annulant ce rendez-vous, celui-ci sera supprimé ainsi que son rapport associé."
        @cancel="isVisibleModal = false"
        @confirm="handleDeleteAppointment"
      />
    </transition>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */
import TopBar from '../../components/Navigators/TopBar.vue';
import Spinner from '../../components/Spinner.vue';
import AlertModal from '../../components/Modals/AlertModal.vue';
import validator from '../../validators';
import DeleteButton from '../../components/Buttons/DeleteButton.vue';
import BackButton from '../../components/Buttons/BackButton.vue';

export default {
  name: 'show-appointment-page',
  components: {
    TopBar,
    Spinner,
    AlertModal,
    DeleteButton,
    BackButton,
  },
  data() {
    return {
      appointment: null,
      isVisibleModal: false,
      hasUpdatedAppointment: false,
      isUpdatingAppointment: false,
      form: {
        start_at: null,
        finish_at: null,
      },
    };
  },
  validations() {
    return {
      form: {
        start_at: validator.appointment.form.start_at,
        finish_at: validator.appointment.form.finish_at,
      },
    };
  },
  computed: {
    status() {
      return this.$store.getters['appointmentsModule/getStatus'];
    },
    token() {
      return this.$store.getters['authModule/getToken'];
    },
    queryGoogleMap() {
      let query = '';
      const location = JSON.parse(this.appointment.location);

      location.address.country ? query += `${location.address.country} ` : null;
      location.address.postalCode ? query += `${location.address.postalCode} ` : null;
      location.address.county ? query += `${location.address.county} ` : null;
      location.address.city ? query += `${location.address.city} ` : null;
      location.address.houseNumber ? query += `${location.address.houseNumber} ` : null;
      location.address.street ? query += `${location.address.street} ` : null;

      return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    },
    appointmentLocation() {
      return JSON.parse(this.appointment.location);
    },
    isAppointmentOver() {
      if (this.appointment) {
        return (
          this.$moment().format('YYYY-MM-DD, h:mm:ss') > this.$moment(this.appointment.finish_at).format('YYYY-MM-DD, h:mm:ss')
        );
      }
      return '';
    },
    startAt: {
      get() {
        return this.form.start_at;
      },
      set(value) {
        if (value) {
          this.form.start_at = value;
          this.form.finish_at = this.$moment(value)
            .add(1.5, 'hours')
            .format('YYYY-MM-DDTHH:mm:ss.SSSSZ');
        }
      },
    },
    finishAt: {
      get() {
        return this.$moment(this.appointment.finish_at)
          .format('YYYY-MM-DDTHH:mm:ss.SSSSZ');
      },
      set(value) {
        this.form.finish_at = value;
      },
    },
    hasChangeHour() {
      // eslint-disable-next-line max-len
      const hasChangeStart = this.$moment(this.form.start_at)
        .diff(this.appointment.start_at) !== 0;
      // eslint-disable-next-line max-len
      const hasChangeFinish = this.$moment(this.form.finish_at)
        .diff(this.appointment.finish_at) !== 0;

      if (hasChangeStart || hasChangeFinish) {
        return true;
      }

      return false;
    },
  },
  methods: {
    handleDeleteAppointment() {
      const { id } = this.appointment;
      this.appointment = null;
      this.isVisibleModal = false;
      this.$store.dispatch('appointmentsModule/remove', id)
        .then(() => {
          this.$router.go(-1);
        });
    },
    handleUpdateAppointment() {
      const { id } = this.appointment;
      this.isUpdatingAppointment = true;
      this.$store.dispatch('appointmentsModule/update', {
        id,
        formData: this.form,
      })
        .then((newAppointment) => {
          this.appointment = newAppointment;
          this.hasUpdatedAppointment = true;
          this.isUpdatingAppointment = false;
        });
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
      const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.API_ENDPOINTS.FETCH_APPOINTMENT}${this.$route.params.id}`;
      const { data: { data: appointment } } = await this.$axios.get(endpoint, config);
      if (appointment !== undefined) {
        this.appointment = appointment; // sauvegarde
        this.form.start_at = this.$moment(appointment.start_at)
          .format('YYYY-MM-DDTHH:mm:ss.SSSSZ');
        this.form.finish_at = this.$moment(appointment.finish_at)
          .format('YYYY-MM-DDTHH:mm:ss.SSSSZ');
      }
    }
  },

};
</script>

<style lang="stylus">

// Theming datepicker
.datetime-start, .datetime-finish
  .vdatetime-time-picker__item--selected
    color theme('colors.purple.800')
  .vdatetime-month-picker__item--selected
    color theme('colors.purple.800')
  .vdatetime-popup__actions__button
    color theme('colors.purple.800')
  .vdatetime-calendar__month__day--selected:hover > span > span
    background theme('colors.purple.800')
  .vdatetime-calendar__month__day--selected > span > span
    background theme('colors.purple.800')
  .vdatetime-popup__header
    background theme('colors.purple.800')

</style>
