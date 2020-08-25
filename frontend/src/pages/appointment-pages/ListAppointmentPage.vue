<template>
<!-- eslint-disable max-len -->
  <transition
    enter-active-class="animated fadeIn faster"
    leave-active-class="animated fadeOut faster"
    mode="out-in">
    <!-- Main -->
    <div class="min-h-screen"  v-infinite-scroll="handleFetchMore" infinite-scroll-distance="1">
      <div class="container mx-auto px-4">

        <!-- filtres -->
        <div class="flex flex-col py-4">
           <!-- par nom du partenaire -->
           <div class="pb-2">
            <input-search
              id="customers"
              placeholder="(Optionnel) Nom du partenaire"
              :status="status"
              @search="handleSearchCustomer"
            >
            </input-search>
          </div>

          <!-- par status du rapport -->
          <div class="flex pb-2">
            <filter-button id="all-filter-button"
              value="all"
              :active-filter="params.report_status"
              @onUpdateFilter="$event => params.report_status = $event">
              Tous
            </filter-button>

            <filter-button id="uncompleted-filter-button"
              value="uncompleted"
              :active-filter="params.report_status"
              @onUpdateFilter="$event => params.report_status = $event">
              À Compléter
            </filter-button>

            <filter-button id="completed-filter-button"
              value="completed"
              :active-filter="params.report_status"
              @onUpdateFilter="$event => params.report_status = $event">
              Complété(s)
            </filter-button>
          </div>

          <!-- par période -->
          <div class="flex pb-2">
            <filter-button id="current-day-filter-button"
              value="current_day"
              :active-filter="params.period"
              @onUpdateFilter="$event => params.period = $event">
              Aujourd'hui
            </filter-button>

            <filter-button id="current-week-filter-button"
              value="current_week"
              :active-filter="params.period"
              @onUpdateFilter="$event => params.period = $event">
              Cette Semaine
            </filter-button>

            <filter-button id="current-month-filter-button"
              value="current_month"
              :active-filter="params.period"
              @onUpdateFilter="$event => params.period = $event">
              Ce Mois-ci
            </filter-button>
          </div>
        </div>

        <!-- listing RDV -->
        <ul v-if="appointments && appointments.length">
          <li v-for="appointment in appointments" :key="appointment.id">
            <appointment-item :appointment="appointment"/>
          </li>
        </ul>
        <spinner v-else-if="status === $const.API.STATUS.LOADING" :is-visible="true"></spinner>
        <div v-else class="absolute top-50 left-0 flex flex-col justify-center items-center">
          <p class="text-gray-500 text-center px-10">{{ $t('page.appointments.empty') }}</p>
        </div>

        <!-- more -->
        <div class="flex flex-col justify-center items-center pb-10 pt-4">
          <hr class="w-2/4" :class="[status === $const.API.STATUS.LOADING ? 'mb-0' : 'mb-4']">
          <transition mode="out-in"
            enter-active-class="animated fadeIn faster-x2"
            leave-active-class="animated fadeOut faster-x2">
            <moon-loader
              class="v-spinner-custom"
              v-if="status === $const.API.STATUS.LOADING"
              :color="$const.MISC.SPINNER.COLOR"
            ></moon-loader>
          </transition>
        </div>

        <!-- go to create appointment form -->
        <float-button @tap="goTo($const.NAVIGATION.CREATE_APPOINTMENT_PAGE.NAME)">
          <add-icon></add-icon>
        </float-button>
      </div>
    </div>
  </transition>
</template>

<script>
import AppointmentItem from '../../components/Appointments/AppointmentItem.vue';
import FloatButton from '../../components/Buttons/FloatButton.vue';
import Spinner from '../../components/Spinner.vue';
import FilterButton from '../../components/Filter/FilterButton.vue';
import InputSearch from '../../components/Inputs/InputSearch.vue';

import { ICONS } from '../../constants';

const { common: { AddIcon } } = ICONS;

export default {
  name: 'list-appointment-page',
  components: {
    AppointmentItem,
    FloatButton,
    Spinner,
    AddIcon,
    FilterButton,
    InputSearch,
  },
  data() {
    return {
      params: {
        limit: 10,
        offset: 0,
        period: 'current_day',
        report_status: 'all',
        commercial_name: '',
      },
      hasGetMax: false,
    };
  },
  methods: {
    fetchAppointments() {
      if (this.status !== this.$const.API.STATUS.LOADING) {
        this.$store.dispatch('appointmentsModule/fetchAppointments', this.params).then(() => {
          // Handle invalid token even if user is authenticated
          if (this.$store.getters['appointmentsModule/getStatus'] === this.$const.API.STATUS
            .UNAUTHORIZED) {
            this.$store.dispatch('authModule/logout').then(() => {
              this.$router.push({
                name: this.$const.NAVIGATION.LOGIN_PAGE.NAME,
              });
            });
          }
        });
      }
    },
    handleFetchMore() {
      if (this.status !== this.$const.API.STATUS.LOADING) {
        if (this.params.offset !== this.appointments.length) {
          if (this.appointments.length % 10 === 0) {
            this.params.offset = this.appointments.length;
            this.fetchAppointments();
          }
        }
      }
    },
    handleSearchCustomer(commercialName = '') {
      this.params.offset = 0;
      this.params.commercial_name = commercialName;
      this.clearAppointments();
      this.fetchAppointments();
    },
    clearAppointments() {
      this.$store.commit('appointmentsModule/setAppointments', []);
    },
  },
  computed: {
    appointments: {
      get() {
        return this.$store.getters['appointmentsModule/getAppointments'];
      },
    },
    status() {
      return this.$store.getters['appointmentsModule/getStatus'];
    },
  },
  destroyed() {
    this.clearAppointments();
  },
  mounted() {
    this.clearAppointments();
    this.fetchAppointments();
  },
};
</script>

<style lang="stylus" scoped>

</style>
