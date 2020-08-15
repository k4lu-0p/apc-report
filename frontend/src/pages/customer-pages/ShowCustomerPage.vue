<template>
<!-- eslint-disable max-len -->
  <div class="min-h-screen">
    <top-bar
      has-back-button
      has-delete-button
      @delete="isVisibleModal = true"
    />
    <div class="container mx-auto px-4">
      <div v-if="customer">
        <div class="py-4">
          <ul>
            <li v-if="customer.commercial_name" class="py-2">
              <p class="text-gray-800">
                <span class="font-bold text-lg">Nom commercial :</span> {{ customer.commercial_name }}
              </p>
            </li>
            <li v-if="customer.leader_lastname" class="py-2">
              <p class="text-gray-800">
                <span class="font-bold text-lg">Nom du dirigeant :</span> {{ customer.leader_lastname }}
              </p>
            </li>
            <li v-if="customer.leader_firstname" class="py-2">
              <p class="text-gray-800">
                <span class="font-bold text-lg">Prénom du dirigeant :</span> {{ customer.leader_firstname }}
              </p>
            </li>
            <li class="py-2" v-if="address">
              <p class="text-gray-800">
                <span class="font-bold text-lg">Adresse :</span>
              </p>
              <ul class="py-2">
                <li v-if="address.country"><span class="font-medium">Pays : </span>{{ address.country }}</li>
                <li v-if="address.state"><span class="font-medium">Région : </span>{{ address.state }}</li>
                <li v-if="address.county"><span class="font-medium">Département : </span>{{ address.county }}</li>
                <li v-if="address.postalCode"><span class="font-medium">Code postal : </span>{{ address.postalCode }}</li>
                <li v-if="address.city"><span class="font-medium">Ville : </span>{{ address.city }}</li>
                <li v-if="address.houseNumber"><span class="font-medium">Numéro : </span>{{ address.houseNumber }}</li>
                <li v-if="address.street"><span class="font-medium">Rue : </span>{{ address.street }}</li>
              </ul>
            </li>
            <li v-if="customer.phone" class="py-2">
              <p class="text-gray-800">
                <span class="font-bold text-lg">Téléphone :</span> {{ customer.phone }}
              </p>
            </li>
            <li v-if="customer.email" class="py-2">
              <p class="text-gray-800">
                <span class="font-bold text-lg">Email :</span> {{ customer.email }}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <spinner
        :is-visible="customer === null"
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
        title="Supprimer ce partenaire ?"
        message="En supprimant ce partenaire, les données seront définitivement perdue."
        @cancel="isVisibleModal = false"
        @confirm="handleDeleteCustomer"
      />
    </transition>

     <!-- go to edit customer form -->
    <float-button
      v-if="customer"
      @tap="goTo($const.NAVIGATION.EDIT_CUSTOMER_PAGE.NAME, customer.id)">
      <edit-icon></edit-icon>
    </float-button>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */
import TopBar from '../../components/Navigators/TopBar.vue';
import Spinner from '../../components/Spinner.vue';
import AlertModal from '../../components/Modals/AlertModal.vue';
import FloatButton from '../../components/Buttons/FloatButton.vue';
import { ICONS } from '../../constants';

const { common: { EditIcon } } = ICONS;

export default {
  name: 'show-customer-page',
  components: {
    TopBar,
    Spinner,
    AlertModal,
    FloatButton,
    EditIcon,
  },
  data() {
    return {
      customer: null,
      isVisibleModal: false,
    };
  },
  computed: {
    token() {
      return this.$store.getters['authModule/getToken'];
    },
    address() {
      return JSON.parse(this.customer.address).address;
    },
  },
  methods: {
    handleDeleteCustomer() {
      const { id } = this.customer;
      this.customer = null;
      this.isVisibleModal = false;
      this.$store.dispatch('customersModule/deleteCustomer', id).then(() => {
        this.$router.go(-1);
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
      const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.FETCH_CUSTOMER}${this.$route.params.id}`;
      const { data: { data: customer } } = await this.$axios.get(endpoint, config);
      if (customer !== undefined) {
        this.customer = customer;
      }
    }
  },

};
</script>

<style lang="stylus">

</style>
