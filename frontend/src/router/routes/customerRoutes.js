// routes: customer

import IndexCustomerPage from '../../pages/customer-pages/IndexCustomerPage.vue';
import ListCustomerPage from '../../pages/customer-pages/ListCustomerPage.vue';
import ShowCustomerPage from '../../pages/customer-pages/ShowCustomerPage.vue';
import EditCustomerPage from '../../pages/customer-pages/EditCustomerPage.vue';

import $const from '../../constants';

export default {
  path: $const.NAVIGATION.INDEX_CUSTOMER_PAGE.PATH,
  component: IndexCustomerPage,
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: $const.NAVIGATION.LIST_CUSTOMER_PAGE.PATH,
      name: $const.NAVIGATION.LIST_CUSTOMER_PAGE.NAME,
      component: ListCustomerPage,
    },
    {
      path: $const.NAVIGATION.SHOW_CUSTOMER_PAGE.PATH,
      name: $const.NAVIGATION.SHOW_CUSTOMER_PAGE.NAME,
      component: ShowCustomerPage,
    },
    {
      path: $const.NAVIGATION.EDIT_CUSTOMER_PAGE.PATH,
      name: $const.NAVIGATION.EDIT_CUSTOMER_PAGE.NAME,
      component: EditCustomerPage,
      props: true,
    },
  ],
};
