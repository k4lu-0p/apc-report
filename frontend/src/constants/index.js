import SupportIcon from '../assets/svg/support.svg';
import SettingsIcon from '../assets/svg/settings.svg';
import ReportsIcon from '../assets/svg/reports.svg';
import UsersIcon from '../assets/svg/users.svg';
import AppointmentsIcon from '../assets/svg/appointments.svg';
import HomeIcon from '../assets/svg/home.svg';
import AddIcon from '../assets/svg/add.svg';
import BackIcon from '../assets/svg/back.svg';
import MagnifyIcon from '../assets/svg/magnify.svg';
import AcceptIcon from '../assets/svg/accept.svg';

export default {
  CONFIG: {
    LOCAL: {
      FR: 'fr',
      EN: 'en',
    },
  },
  MISC: {
    SPINNER: {
      COLOR: '#319795',
    },
  },
  API: {
    // BASE_URL: '', // Dev mod
    // BASE_URL: 'http://localhost:8000', // Vue Serve mod
    BASE_URL: 'http://212.47.230.255', // Preprod mod
    ENDPOINTS: {
      LOGIN: '/api/login',
      FETCH_REPORTS: '/api/reports',
      FETCH_APPOINTMENTS: '/api/appointments',
      FETCH_CUSTOMERS: '/api/customers',
      STORE_APPOINTMENT: '/api/appointment',
    },
    STATUS: {
      LOADING: 'loading',
      SUCCESS: 'success',
      ERROR: 'error',
      UNAUTHORIZED: 'unauthorized',
    },
  },
  NAVIGATION: {
    TABS: {
      HOME_PAGE: 'home-page',
      SETTINGS_PAGE: 'settings-page',
      APPOINTMENTS_HOME: 'appointments-home',
      CUSTOMERS_HOME: 'customers-home',
      REPORTS_HOME: 'reports-home',
    },
  },
};

export const IMAGES = {
  svg: {
    HomeIcon,
    SupportIcon,
    SettingsIcon,
    ReportsIcon,
    UsersIcon,
    AppointmentsIcon,
    AddIcon,
    BackIcon,
    MagnifyIcon,
    AcceptIcon,
  },
};
