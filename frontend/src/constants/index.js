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
import ClockIcon from '../assets/svg/clock.svg';

export default {
  CONFIG: {
    LIMIT_WIDTH_SCREEN: 768,
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
    BASE_URL: 'http://localhost:8000', // Vue Serve mod
    // BASE_URL: 'https://212.47.230.255', // Preprod mod
    ENDPOINTS: {
      LOGIN: '/api/login',
      FETCH_REPORTS: '/api/reports',
      UPDATE_REPORT: '/api/report',
      FETCH_APPOINTMENTS: '/api/appointments',
      FETCH_CUSTOMERS: '/api/customers',
      FETCH_SETTINGS: '/api/settings',
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
    // index
    LOGIN_INDEX: { NAME: 'login-index', PATH: '/login' },
    HOME_INDEX: { NAME: 'home-index', PATH: '/' },
    SETTINGS_INDEX: { NAME: 'settings-index', PATH: '/settings' },
    APPOINTMENTS_INDEX: { NAME: 'appointments-index', PATH: '/appointments' },
    CUSTOMERS_INDEX: { NAME: 'customers-index', PATH: '/customers' },
    REPORTS_INDEX: { NAME: 'reports-index', PATH: '/reports' },

    // childs: settings
    SETTINGS_HOME: { NAME: 'settings-home', PATH: '' },

    // childs: appointments
    APPOINTMENTS_HOME: { NAME: 'appointments-home', PATH: '' },
    APPOINTMENTS_CREATE: { NAME: 'appointments-create', PATH: 'create' },

    // childs: customers
    CUSTOMERS_HOME: { NAME: 'customers-home', PATH: '' },

    // childs: reports
    REPORTS_HOME: { NAME: 'reports-home', PATH: '' },
    REPORTS_EDIT: { NAME: 'reports-edit', PATH: 'edit/:id' },

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
    ClockIcon,
  },
};
