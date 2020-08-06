// common icons
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
import LocationIcon from '../assets/svg/location.svg';
import WarningIcon from '../assets/svg/warning.svg';
import AlertIcon from '../assets/svg/alert.svg';
import DeleteIcon from '../assets/svg/remove.svg';
import EditIcon from '../assets/svg/edit.svg';

// weather icons
import CloudCloudy from '../assets/svg/weather/cloud_cloudy.svg';
import CloudCloudySun from '../assets/svg/weather/cloud_cloudy_sun.svg';
import CloudCloudyThunderStorm from '../assets/svg/weather/cloud_cloudy_thunder_storm.svg';
import CloudDrizzleRain from '../assets/svg/weather/cloud_drizzle_rain.svg';
import CloudFog from '../assets/svg/weather/cloud_fog.svg';
import CloudHeavyRain from '../assets/svg/weather/cloud_heavy_rain.svg';
import CloudHeavyRainThunderStorm from '../assets/svg/weather/cloud_heavy_rain_thunder_storm.svg';
import CloudHeavySnow from '../assets/svg/weather/cloud_heavy_snow.svg';
import CloudNight from '../assets/svg/weather/cloud_night.svg';
import CloudRain from '../assets/svg/weather/cloud_rain.svg';
import CloudSnow from '../assets/svg/weather/cloud_snow.svg';
import CloudWinter from '../assets/svg/weather/cloud_winter.svg';
import SunSunnyCloud from '../assets/svg/weather/sun_sunny_cloud.svg';
import SunSunnyHot from '../assets/svg/weather/sun_sunny_hot.svg';

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
      FETCH_REPORT: '/api/report/',
      FETCH_APPOINTMENTS: '/api/appointments',
      FETCH_APPOINTMENT: '/api/appointment/',
      FETCH_CUSTOMERS: '/api/customers',
      FETCH_CUSTOMER: '/api/customer/',
      DELETE_CUSTOMER: '/api/customer/',
      FETCH_SETTINGS: '/api/settings',
      STORE_APPOINTMENT: '/api/appointment',
      DELETE_APPOINTMENT: '/api/appointment/',
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
};

export const ICONS = {
  common: {
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
    LocationIcon,
    WarningIcon,
    AlertIcon,
    DeleteIcon,
    EditIcon,
  },
  weather: {
    CloudCloudy,
    CloudCloudySun,
    CloudCloudyThunderStorm,
    CloudDrizzleRain,
    CloudFog,
    CloudHeavyRain,
    CloudHeavyRainThunderStorm,
    CloudHeavySnow,
    CloudNight,
    CloudRain,
    CloudSnow,
    CloudWinter,
    SunSunnyCloud,
    SunSunnyHot,
  },
};
