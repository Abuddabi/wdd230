import { WEATHER_API_KEY } from '../../env.js';

let apiKey = WEATHER_API_KEY;

if (apiKey === "WEATHER_API_KEY_PLACEHOLDER") {
  const weatherAPI_LSkey = "WEATHER_API_KEY";
  apiKey = localStorage.getItem(weatherAPI_LSkey);

  if (!apiKey) {
    const main = document.querySelector("main");
    const bufferHTML = main.innerHTML;
    const keyId = "js-api-key";
    const submitId = "js-api-submit";
    main.innerHTML = `
      <p>Please, paste the API key:</p>
      <input type="text" id="${keyId}">
      <input id="${submitId}" type="submit" value="Submit">
      <p>------------------</p>
    `;
    const submit = main.querySelector(`#${submitId}`);
    submit.addEventListener("click", async () => {
      apiKey = main.querySelector(`#${keyId}`).value;
      const data = await apiFetch();
      localStorage.setItem(weatherAPI_LSkey, apiKey);
      main.innerHTML = bufferHTML;
      displayResults(data);
    });
  } else getWeather();
} else {
  getWeather();
}

async function getWeather() {
  const data = await apiFetch();
  displayResults(data);
}

async function apiFetch() {
  const lat = "49.75";
  const lon = "6.64";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
      // console.log(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

function displayResults(data) {
  const currentTemp = document.querySelector('#current-temp');
  const weatherIcon = document.querySelector('#weather-icon');
  const captionDesc = document.querySelector('figcaption');

  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
}