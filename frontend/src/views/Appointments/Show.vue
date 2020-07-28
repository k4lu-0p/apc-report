<template>
<!-- eslint-disable max-len -->
  <div>
    <top-bar has-back-button ></top-bar>
    <div class="container mx-auto px-4">

      <div v-if="appointment">
        <div class="py-4">
          <h1 class="font-bold text-2xl py-4">{{ appointment.title }}</h1>
          <p>Rendez-vous avec <span class="font-medium">{{ appointment.customer.name }}</span></p>
          <p>Début du rendez-vous : <span class="font-medium">{{ $moment(appointment.start_at).calendar() }}</span></p>
          <p>Fin du rendez-vous estimée : <span class="font-medium">{{ $moment(appointment.finish_at).calendar() }}</span></p>
        </div>

        <div class="py-4">
          <h2 class="font-bold text-lg py-4">{{ appointmentLocation.label }}</h2>
        </div>

        <a
          class="bg-teal-600 text-white font-bold rounded px-4 py-2 block my-4 text-center"
          :href="queryGoogleMap"
          target="_blank"
        >
          Itinéraire Google Map
        </a>
      </div>

      <spinner
        :is-visible="appointment === null"
      ></spinner>

    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */
import TopBar from '../../components/Navigators/TopBar.vue';
import Spinner from '../../components/Spinner.vue';

export default {
  name: 'appointments-show',
  components: {
    TopBar,
    Spinner,
  },
  data() {
    return {
      appointment: null,
    };
  },
  computed: {
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
      const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.FETCH_APPOINTMENT}${this.$route.params.id}`;
      const { data: { data: appointment } } = await this.$axios.get(endpoint, config);
      if (appointment !== undefined) {
        this.appointment = appointment;
        console.log(this.appointment);
      }
    }
  },

};
</script>

<style lang="stylus">

</style>
