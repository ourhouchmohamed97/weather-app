const ICON_MAP = {
  'clear-day': { emoji: '☀️', theme: 'theme-clear' },
  'clear-night': { emoji: '🌙', theme: 'theme-night' },
  'partly-cloudy-day': { emoji: '⛅', theme: 'theme-cloudy' },
  'partly-cloudy-night': { emoji: '☁️', theme: 'theme-night' },
  cloudy: { emoji: '☁️', theme: 'theme-cloudy' },
  rain: { emoji: '🌧️', theme: 'theme-rain' },
  showers: { emoji: '🌦️', theme: 'theme-rain' },
  snow: { emoji: '❄️', theme: 'theme-snow' },
  wind: { emoji: '💨', theme: 'theme-cloudy' },
  fog: { emoji: '🌫️', theme: 'theme-cloudy' },
  thunderstorm: { emoji: '⛈️', theme: 'theme-rain' },
};
const DEFAULT_ICON = { emoji: '🌡️', theme: 'theme-clear' };

function getIconInfo(icon) {
  return ICON_MAP[icon] || DEFAULT_ICON;
}

function buildLayout() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="app-shell">
      <header>
        <h1>Weather</h1>
        <form id="search-form">
          <input
            type="text"
            id="location-input"
            placeholder="City, zip, or address..."
            autocomplete="off"
            required
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main id="results">
        <p class="hint">Search a location to see the forecast.</p>
      </main>
    </div>
  `;
}

function showLoading() {
  const results = document.getElementById('results');
  results.innerHTML = `<div class="loader"><div class="spinner"></div><p>Fetching weather...</p></div>`;
}

function showError(message) {
  const results = document.getElementById('results');
  results.innerHTML = `<p class="error">${message}</p>`;
}

function applyBackgroundTheme(theme) {
  document.body.className = theme;
}

function renderWeather(data, unit) {
  const results = document.getElementById('results');
  const { current, forecast, resolvedLocation } = data;
  const { emoji, theme } = getIconInfo(current.icon);

  applyBackgroundTheme(theme);

  const currentTemp = unit === 'F' ? current.tempF : current.tempC;
  const feelsLike = unit === 'F' ? current.feelsLikeF : current.feelsLikeC;

  results.innerHTML = `
    <div class="current-weather">
      <div class="unit-toggle">
        <button class="unit-btn ${unit === 'F' ? 'active' : ''}" data-unit="F">°F</button>
        <button class="unit-btn ${unit === 'C' ? 'active' : ''}" data-unit="C">°C</button>
      </div>

      <p class="location">${resolvedLocation}</p>
      <div class="icon">${emoji}</div>
      <p class="temp">${Math.round(currentTemp)}°${unit}</p>
      <p class="conditions">${current.conditions}</p>
      <p class="feels-like">Feels like ${Math.round(feelsLike)}°${unit}</p>
      <p class="details">Humidity: ${current.humidity}% &middot; Wind: ${Math.round(
        current.windSpeedMph
      )} mph</p>
    </div>

    <div class="forecast">
      ${forecast
        .map((day) => {
          const dayIcon = getIconInfo(day.icon);
          const max = unit === 'F' ? day.tempMaxF : day.tempMaxC;
          const min = unit === 'F' ? day.tempMinF : day.tempMinC;
          const label = new Date(day.date + 'T00:00:00').toLocaleDateString(
            'en-US',
            { weekday: 'short' }
          );
          return `
            <div class="forecast-day">
              <p class="day-label">${label}</p>
              <div class="day-icon">${dayIcon.emoji}</div>
              <p class="day-temps">
                <span class="max">${Math.round(max)}°</span>
                <span class="min">${Math.round(min)}°</span>
              </p>
            </div>
          `;
        })
        .join('')}
    </div>
  `;
}

export { buildLayout, showLoading, showError, renderWeather };
