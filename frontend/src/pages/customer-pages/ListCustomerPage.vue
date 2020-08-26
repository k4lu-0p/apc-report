<template>
<!-- eslint-disable max-len -->
  <!-- Main -->
  <div class="min-h-screen">
    <!-- top bar -->
    <top-bar></top-bar>
    <div class="container mx-auto px-4">

      <div class="py-6">
        <!-- search -->
        <input-search
          id="customers"
          placeholder="Rechercher un partenaire"
          :status="status"
          @search="handleSearch"
        >
        </input-search>
      </div>

      <transition
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster"
        mode="out-in"
      >
        <ul v-if="customers && customers.length" class="grid grid-cols-2 gap-2">
          <li v-for="customer in customers" :key="customer.id">
            <customer-item
              @delete="handleOnDelete($event)"
              :customer="customer"
            />
          </li>
        </ul>
        <spinner v-else-if="status === $const.API.STATUS.LOADING" :is-visible="true"></spinner>
        <p v-else class="text-gray-500 text-center px-10">Aucun résultat</p>
      </transition>
    </div>
  </div>
</template>

<script>
import CustomerItem from '../../components/Customers/CustomerItem.vue';
import TopBar from '../../components/Navigators/TopBar.vue';
import Spinner from '../../components/Spinner.vue';
import InputSearch from '../../components/Inputs/InputSearch.vue';

export default {
  name: 'list-customer-page',
  components: {
    CustomerItem,
    TopBar,
    Spinner,
    InputSearch,
  },
  data() {
    return {
      params: {
        limit: 10,
        offset: 0,
        by: 'commercial_name',
        value: '',
      },
    };
  },
  methods: {
    async handleOnDelete(customerId) {
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.APC_REPORT.DELETE_CUSTOMER}${customerId}`;
      await this.$axios.delete(endpoint, config);
    },
    handleSearch(commercialName = '') {
      this.params.value = commercialName;

      this.$store.dispatch('customersModule/fetchCustomers', this.params).then(() => {
        // Handle invalid token even if user is authenticated
        if (this.$store.getters['customersModule/getStatus'] === this.$const.API.STATUS.UNAUTHORIZED) {
          this.$store.dispatch('authModule/logout').then(() => {
            this.$router.push({
              name: this.$const.NAVIGATION.LOGIN_PAGE.NAME,
            });
          });
        }
      });
    },
  },
  computed: {
    customers() {
      return this.$store.getters['customersModule/getCustomers'];
    },
    token() {
      return this.$store.getters['authModule/getToken'];
    },
    status() {
      return this.$store.getters['customersModule/getStatus'];
    },
  },
  mounted() {
    this.handleSearch();
  },
};
</script>
