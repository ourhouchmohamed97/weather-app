# Weather App (The Odin Project)

Vanilla JS + webpack weather forecast app using the Visual Crossing Timeline API.

---

## Live Demo

👉 **[View the project here](https://ourhouchmohamed97.github.io/weather-app/)**

---

## Setup

1. Get a free API key: https://www.visualcrossing.com/weather-api
2. Paste it into `src/config.js`:
   ```js
   const VISUAL_CROSSING_API_KEY = 'your-key-here';
   ```
3. Install deps: `npm install`
4. Run dev server: `npm start`
5. Build for production: `npm run build`

## Features

- Search any location (city, zip, address)
- 5-day forecast + current conditions
- Fahrenheit / Celsius toggle (no re-fetch, computed client-side)
- Background theme + icon changes based on conditions (clear, cloudy, rain, snow, night)
- Loading spinner while the request is in flight
- Basic error handling for bad/unknown locations

## Structure

- `src/weatherAPI.js` — fetch + shape the API response
- `src/domController.js` — all DOM rendering (layout, loading, error, results)
- `src/index.js` — wires the form and unit toggle together
- `src/config.js` — API key (intentionally client-side per the assignment)


---

This project was completed as part of **The Odin Project** JavaScript curriculum.