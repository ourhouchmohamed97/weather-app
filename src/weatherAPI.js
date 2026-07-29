import { VISUAL_CROSSING_API_KEY } from './config.js';

const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

async function fetchWeatherData(location) {
  const url = `${BASE_URL}/${encodeURIComponent(
    location
  )}?unitGroup=us&key=${VISUAL_CROSSING_API_KEY}&contentType=json`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 400 || response.status === 404) {
      throw new Error('Location not found. Try a different search.');
    }
    throw new Error(`Weather service error (${response.status}).`);
  }

  return response.json();
}

function processWeatherData(rawData) {
  const today = rawData.days?.[0];

  if (!today) {
    throw new Error('Unexpected response shape from weather API.');
  }

  const toCelsius = (f) => ((f - 32) * 5) / 9;

  return {
    resolvedLocation: rawData.resolvedAddress,
    timezone: rawData.timezone,
    current: {
      tempF: today.temp,
      tempC: toCelsius(today.temp),
      feelsLikeF: today.feelslike,
      feelsLikeC: toCelsius(today.feelslike),
      humidity: today.humidity,
      windSpeedMph: today.windspeed,
      conditions: today.conditions,
      description: today.description,
      icon: today.icon,
    },
    forecast: rawData.days.slice(1, 6).map((day) => ({
      date: day.datetime,
      tempMaxF: day.tempmax,
      tempMaxC: toCelsius(day.tempmax),
      tempMinF: day.tempmin,
      tempMinC: toCelsius(day.tempmin),
      conditions: day.conditions,
      icon: day.icon,
    })),
  };
}

async function getWeatherForLocation(location) {
  const rawData = await fetchWeatherData(location);
  return processWeatherData(rawData);
}

export { fetchWeatherData, processWeatherData, getWeatherForLocation };
