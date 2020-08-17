import axios from 'axios';
import $const from '../constants';
import { getCurrentPosition } from './geolocation';

async function createApiInstance(baseURL, params = {}) {
  const { coords: { latitude, longitude } } = await getCurrentPosition;

  return axios.create({
    baseURL,
    withCredentials: false, // This is the default
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params: {
      appid: $const.API.KEY.OPEN_WEATHER_MAP,
      lat: latitude,
      lon: longitude,
      lang: $const.LOCAL.FR,
      ...params,
    },
  });
}

const apiWeatherClient = createApiInstance($const.API.ENDPOINTS.OPEN_WEATHER_MAP.CURRENT_WEATHER);
const apiForecastsClient = createApiInstance($const.API.ENDPOINTS.OPEN_WEATHER_MAP.FORECASTS, { exclude: 'minutely,current,daily' });

export default {
  instanciateCurrentWeather() {
    return apiWeatherClient;
  },
  instanciateForecastsWeather() {
    return apiForecastsClient;
  },
};
