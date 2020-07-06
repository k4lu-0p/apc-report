import SupportIcon from '../assets/svg/support.svg';
import SettingsIcon from '../assets/svg/settings.svg';
import ReportsIcon from '../assets/svg/reports.svg';
import UsersIcon from '../assets/svg/users.svg';

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
    BASE_URL: 'http://localhost:8000',
    ENDPOINTS: {
      LOGIN: '/api/login',
      FETCH_REPORTS: '/api/reports',
    },
    STATUS: {
      LOADING: 'loading',
      SUCCESS: 'success',
      ERROR: 'error',
    },
  },
  NAVIGATION: {
    TABS: {
      HOME_PAGE: 'home-page',
      USERS_PAGE: 'users-page',
      SUPPORT_PAGE: 'support-page',
      SETTINGS_PAGE: 'settings-page',
      REPORTS_PAGE: 'reports-page',
    },
  },
};

export const IMAGES = {
  svg: {
    SupportIcon,
    SettingsIcon,
    ReportsIcon,
    UsersIcon,
  },
};
