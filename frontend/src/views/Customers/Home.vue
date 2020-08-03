<template>
<!-- eslint-disable max-len -->
  <!-- Main -->
  <div class="min-h-screen">
    <!-- top bar -->
    <top-bar :has-search-input="false" ></top-bar>
    <div class="container mx-auto px-4">

      <transition
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster"
        mode="out-in"
      >
        <transition-group v-if="customers && customers.length" tag="ul" class="grid grid-cols-2 gap-2">
          <li v-for="customer in customers" :key="customer.id">
            <customer-item
              @delete="handleOnDelete($event)"
              :customer="customer"
            />
          </li>
        </transition-group>
        <spinner v-else :is-visible="true"></spinner>
      </transition>
    </div>
  </div>
</template>

<script>
import CustomerItem from '../../components/Customers/CustomerItem.vue';
import TopBar from '../../components/Navigators/TopBar.vue';
import Spinner from '../../components/Spinner.vue';

export default {
  name: 'customers-page',
  components: {
    CustomerItem,
    TopBar,
    Spinner,
  },
  data() {
    return {
      params: {
        limit: 10,
        offset: 0,
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
      const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.DELETE_CUSTOMER}${customerId}`;
      await this.$axios.delete(endpoint, config);
    },
  },
  computed: {
    customers() {
      return this.$store.getters['customersModule/getCustomers'];
    },
    token() {
      return this.$store.getters['authModule/getToken'];
    },
  },
  mounted() {
    this.$store.dispatch('customersModule/fetchCustomers', this.params).then(() => {
      // Handle invalid token even if user is authenticated
      if (this.$store.getters['customersModule/getStatus'] === this.$const.API.STATUS.UNAUTHORIZED) {
        this.$store.dispatch('authModule/logout').then(() => {
          this.$router.push({ name: this.$const.NAVIGATION.LOGIN_INDEX.NAME });
        });
      }
    });
  },
};
</script>
