import API_ENDPOINTS from './api-endpoints';
import OPEN_WEATHER_MAP from './open-weather-map';
import KEY from './key';
import STATUS from './status';

export default {
  BASE_URL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888'
    : '',
  ENDPOINTS: {
    API_ENDPOINTS,
    OPEN_WEATHER_MAP,
  },
  STATUS,
  KEY,
};
