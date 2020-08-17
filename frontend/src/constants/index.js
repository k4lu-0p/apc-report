import _ICONS from './icons';
import API from './api';
import NAVIGATION from './navigation';

export default {
  LOCAL: {
    FR: 'fr',
    EN: 'en',
  },
  MISC: {
    LIMIT_WIDTH_SCREEN: 768,
    SPINNER: {
      COLOR: '#319795',
    },
  },
<<<<<<< HEAD
  API: {
    // BASE_URL: '', // Dev mod
    // BASE_URL: 'http://localhost:8000', // Vue Serve mod
    BASE_URL: 'https://apc-report.lucasrobin.fr', // Preprod mod
    ENDPOINTS: {
      LOGIN: '/api/login',
      FETCH_REPORTS: '/api/reports',
      UPDATE_REPORT: '/api/report/',
      FETCH_REPORT: '/api/report/',
      FETCH_USERS: '/api/users',
      FETCH_USER: '/api/user/',
      FETCH_APPOINTMENTS: '/api/appointments',
      FETCH_APPOINTMENT: '/api/appointment/',
      FETCH_CUSTOMERS: '/api/customers',
      FETCH_CUSTOMER: '/api/customer/',
      DELETE_CUSTOMER: '/api/customer/',
      UPDATE_CUSTOMER: '/api/customer/',
      FETCH_SETTINGS: '/api/settings',
      STORE_APPOINTMENT: '/api/appointment',
      DELETE_APPOINTMENT: '/api/appointment/',
      UPDATE_APPOINTMENT: '/api/appointment/',
      NEWSLETTER_CUSTOMER: '/api/newsletter/customers',
    },
    STATUS: {
      LOADING: 'loading',
      SUCCESS: 'success',
      ERROR: 'error',
      UNAUTHORIZED: 'unauthorized',
    },
  },
  API_WEATHER: {
    KEY: '05c26101c105a9c65e3f58779e9adbdf',
    CURRENT_WEATHER: 'https://api.openweathermap.org/data/2.5/weather',
    FORECASTS: 'https://api.openweathermap.org/data/2.5/onecall',
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
    APPOINTMENTS_SHOW: { NAME: 'appointments-show', PATH: 'show/:id' },

    // childs: customers
    CUSTOMERS_HOME: { NAME: 'customers-home', PATH: '' },
    CUSTOMERS_SHOW: { NAME: 'customers-show', PATH: 'show/:id' },
    CUSTOMERS_EDIT: { NAME: 'customers-edit', PATH: 'edit/:id' },

    // childs: reports
    REPORTS_HOME: { NAME: 'reports-home', PATH: '' },
    REPORTS_EDIT: { NAME: 'reports-edit', PATH: 'edit/:id' },

  },
=======
  API,
  NAVIGATION,
>>>>>>> develop
};

export const ICONS = _ICONS;
