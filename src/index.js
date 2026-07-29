import './style.css';
import { getWeatherForLocation } from './weatherAPI.js';
import { buildLayout, showLoading, showError, renderWeather } from './domController.js';

let currentUnit = 'F';
let currentData = null;

function init() {
  buildLayout();

  const form = document.getElementById('search-form');
  form.addEventListener('submit', handleSearch);

  const results = document.getElementById('results');
  results.addEventListener('click', handleUnitToggle);
}

async function handleSearch(event) {
  event.preventDefault();

  const input = document.getElementById('location-input');
  const location = input.value.trim();
  if (!location) return;

  showLoading();

  try {
    const data = await getWeatherForLocation(location);
    console.log(data);

    currentData = data;
    renderWeather(currentData, currentUnit);
  } catch (err) {
    showError(err.message);
  }
}

function handleUnitToggle(event) {
  const target = event.target.closest('.unit-btn');
  if (!target || !currentData) return;

  currentUnit = target.dataset.unit;
  renderWeather(currentData, currentUnit);
}

document.addEventListener('DOMContentLoaded', init);
