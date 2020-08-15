// Pages appointments
import IndexAppointmentPage from '../../pages/appointment-pages/IndexAppointmentPage.vue';
import ListAppointmentPage from '../../pages/appointment-pages/ListAppointmentPage.vue';
import CreateAppointmentPage from '../../pages/appointment-pages/CreateAppointmentPage.vue';
import ShowAppointmentPage from '../../pages/appointment-pages/ShowAppointmentPage.vue';

import $const from '../../constants';

export default {
  path: $const.NAVIGATION.INDEX_APPOINTMENT_PAGE.PATH,
  component: IndexAppointmentPage,
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: $const.NAVIGATION.LIST_APPOINTMENT_PAGE.PATH,
      name: $const.NAVIGATION.LIST_APPOINTMENT_PAGE.NAME,
      component: ListAppointmentPage,
    },
    {
      path: $const.NAVIGATION.CREATE_APPOINTMENT_PAGE.PATH,
      name: $const.NAVIGATION.CREATE_APPOINTMENT_PAGE.NAME,
      component: CreateAppointmentPage,
      props: true,
    },
    {
      path: $const.NAVIGATION.SHOW_APPOINTMENT_PAGE.PATH,
      name: $const.NAVIGATION.SHOW_APPOINTMENT_PAGE.NAME,
      component: ShowAppointmentPage,
      props: true,
    },
  ],
};
