// Pages reports
import IndexReportPage from '../../pages/report-pages/IndexReportPage.vue';
import ListReportPage from '../../pages/report-pages/ListReportPage.vue';
import EditReportPage from '../../pages/report-pages/EditReportPage.vue';

import $const from '../../constants';

export default {
  path: $const.NAVIGATION.INDEX_REPORT_PAGE.PATH,
  component: IndexReportPage,
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: $const.NAVIGATION.LIST_REPORT_PAGE.PATH,
      name: $const.NAVIGATION.LIST_REPORT_PAGE.NAME,
      component: ListReportPage,
    },
    {
      path: $const.NAVIGATION.EDIT_REPORT_PAGE.PATH,
      name: $const.NAVIGATION.EDIT_REPORT_PAGE.NAME,
      component: EditReportPage,
    },
  ],
};
