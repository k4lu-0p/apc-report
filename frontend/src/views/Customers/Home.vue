<template>
  <!-- Main -->
  <div class="container mx-auto px-4">
    <!-- top bar -->
    <top-bar :has-search-input="false" ></top-bar>

    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
      mode="out-in"
    >
      <transition-group v-if="customers && customers.length" tag="ul">
        <li v-for="customer in customers" :key="customer.id">
          <customer-item
            @delete="handleOnDelete($event)"
            :customer="customer"
          />
        </li>
      </transition-group>
      <div v-else class="fixed w-screen flex flex-col justify-center items-center h-screen">
        <moon-loader :color="$const.MISC.SPINNER.COLOR"></moon-loader>
      </div>
    </transition>
  </div>
</template>

<script>
import CustomerItem from '../../components/Customers/CustomerItem.vue';
import TopBar from '../../components/Navigators/TopBar.vue';

export default {
  name: 'customers-page',
  components: {
    CustomerItem,
    TopBar,
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
      const res = await this.$axios.delete(endpoint, config);
      console.log(res);
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
