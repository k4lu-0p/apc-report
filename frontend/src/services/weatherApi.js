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
      appid: $const.API_WEATHER.KEY,
      lat: latitude,
      lon: longitude,
      lang: $const.CONFIG.LOCAL.FR,
      ...params,
    },
  });
}

const apiWeatherClient = createApiInstance($const.API_WEATHER.CURRENT_WEATHER);
const apiForecastsClient = createApiInstance($const.API_WEATHER.FORECASTS, { exclude: 'minutely,current,daily' });

export default {
  instanciateCurrentWeather() {
    return apiWeatherClient;
  },
  instanciateForecastsWeather() {
    return apiForecastsClient;
  },
};
