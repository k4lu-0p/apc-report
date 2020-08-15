// routes
import APPOINTMENT_ROUTES from './appointment-routes';
import CUSTOMER_ROUTES from './customer-routes';
import LOGIN_ROUTES from './login-routes';
import REPORT_ROUTES from './report-routes';
import SETTING_ROUTES from './setting-routes';
import HOME_ROUTES from './home-routes';

export default {
  ...APPOINTMENT_ROUTES,
  ...CUSTOMER_ROUTES,
  ...LOGIN_ROUTES,
  ...REPORT_ROUTES,
  ...SETTING_ROUTES,
  ...HOME_ROUTES,
};
