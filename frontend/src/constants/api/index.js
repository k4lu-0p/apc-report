import APC_REPORT from './apc-report';
import OPEN_WEATHER_MAP from './open-weather-map';
import KEY from './key';
import STATUS from './status';

export default {
  // BASE_URL: '', // Dev mod
  BASE_URL: 'http://localhost:8000', // Vue Serve mod
  // BASE_URL: 'https://apc-report.lucasrobin.fr', // Preprod mod
  ENDPOINTS: {
    APC_REPORT,
    OPEN_WEATHER_MAP,
  },
  STATUS,
  KEY,
};
