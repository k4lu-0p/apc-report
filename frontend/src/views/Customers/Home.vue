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
          <customer-item :customer="customer"/>
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
  computed: {
    customers: {
      get() {
        return this.$store.getters['customersModule/getCustomers'];
      },
    },
  },
  mounted() {
    if (this.customers.length === 0) {
      this.$store.dispatch('customersModule/fetchCustomers').then(() => {
        // Handle invalid token even if user is authenticated
        if (this.$store.getters['customersModule/getStatus'] === this.$const.API.STATUS.UNAUTHORIZED) {
          this.$store.dispatch('authModule/logout').then(() => {
            this.$router.push({ name: this.$const.NAVIGATION.LOGIN_INDEX.NAME });
          });
        }
      });
    }
  },
};
</script>
