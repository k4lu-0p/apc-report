import SupportIcon from '../assets/svg/support.svg';
import SettingsIcon from '../assets/svg/settings.svg';
import ReportsIcon from '../assets/svg/reports.svg';
import UsersIcon from '../assets/svg/users.svg';
import AppointmentsIcon from '../assets/svg/appointments.svg';
import HomeIcon from '../assets/svg/home.svg';
import AddIcon from '../assets/svg/add.svg';

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
    // BASE_URL: 'http://localhost:8000', // Dev mod
    BASE_URL: 'http://212.47.230.255', // Preprod mod
    ENDPOINTS: {
      LOGIN: '/api/login',
      FETCH_REPORTS: '/api/reports',
      FETCH_APPOINTMENTS: '/api/appointments',
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
      USERS_PAGE: 'users-page',
      SUPPORT_PAGE: 'support-page',
      SETTINGS_PAGE: 'settings-page',
      REPORTS_PAGE: 'reports-page',
      APPOINTMENTS_PAGE: 'appointments-page',
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
  },
};
