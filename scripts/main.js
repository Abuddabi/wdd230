import "./getDates.js";

function checkIfGithub() {
  const host = window.location.hostname;
  if (!host.includes("github")) return;

  const anchors = document.querySelectorAll("a");

  anchors.forEach(a => {
    const href = a.getAttribute("href");
    if (href.startsWith("/")) a.setAttribute("href", `/wdd230${href}`);
  });
}

function toggleMobileMenu() {
  const hamButton = document.querySelector('#js-mobile-menu');
  const nav = hamButton.parentNode;

  hamButton.addEventListener('click', () => {
    nav.classList.toggle('js-mobile-open');
  });
}

function toggleTheme() {
  const body = document.body;
  const themeLSKey = "theme";

  function toDark() {
    body.dataset.theme = "dark";
    body.classList.remove("themeLight");
    body.classList.add("themeDark");
    localStorage.setItem(themeLSKey, "dark");
  }

  function toLight() {
    body.dataset.theme = "light";
    body.classList.remove("themeDark");
    body.classList.add("themeLight");
    localStorage.setItem(themeLSKey, "light");
  }

  const themeFromLS = window.localStorage.getItem(themeLSKey) || false;

  if (!themeFromLS) {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) toDark();
  }
  else if (themeFromLS == "dark") toDark();
  /* by default the theme is Light */

  const checkbox = body.querySelector("#themeToggle");

  checkbox.addEventListener("change", () => {
    const currentTheme = body.dataset.theme;

    if (currentTheme == "light") toDark();
    else if (currentTheme == "dark") toLight();
  });
}

function checkVisits() {
  const visitEl = document.querySelector("#js-visits");
  if (!visitEl) return;

  const visitsLSKey = "numbOfVisits";
  let numVisits = Number(window.localStorage.getItem(visitsLSKey)) || 0;
  visitEl.textContent = numVisits > 0 ? numVisits : "This is your first visit. 🥳 Welcome!";
  numVisits++;
  localStorage.setItem(visitsLSKey, numVisits);
}

function loadLinks() {
  const list = document.querySelector("#js-learning-links");
  if (!list) return;

  const baseURL = window.location.hostname.includes("github") ? "https://abuddabi.github.io/wdd230/" : "http://127.0.0.1:5500/";
  const url = `${baseURL}data/links.json`;

  async function getLinks() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        displayLinks(data.weeks);
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  }

  function displayLinks(weeks) {
    list.innerHTML = "";
    weeks.forEach(w => {
      list.innerHTML += `
        <li>
          <span class="week-number">${w.week}:</span>
          <span class="week-info">
            ${w.links.map(l => `<a href="${l.url}">${l.title}</a>`).join("")}
          </span>
        </li>
      `;
    });
  }

  getLinks();
}

function loadWeather() {
  const weatherBlock = document.querySelector("#js-weather");
  if (!weatherBlock) return;

  const weatherAPI_LSkey = "WEATHER_API_KEY";
  let apiKey = localStorage.getItem(weatherAPI_LSkey);

  if (!apiKey) {
    const inputId = "js-weather-api";
    const submitId = "js-weather-submit";
    weatherBlock.innerHTML = `
      <p class="m5">Please, paste the API key for the weather request:</p>
      <input class="p8 mw66" type="text" id="${inputId}">
      <input class="m5 p8" type="submit" id="${submitId}" value="Submit">
    `;
    document.querySelector(`#${submitId}`).addEventListener("click", () => {
      apiKey = document.querySelector(`#${inputId}`).value;
      localStorage.setItem(weatherAPI_LSkey, apiKey);
      apiFetch();
    });
  } else {
    apiFetch();
  }

  async function apiFetch() {
    const lat = "59.94";
    const lon = "30.36";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        displayResults(data);
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  }

  function displayResults(data) {
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const src = `https://openweathermap.org/img/w/${icon}.png`;

    weatherBlock.innerHTML = `<img src="${src}" alt="${desc}">${temp}&deg;C, ${desc}`;
  }
}

// RUN SECTION
checkIfGithub();
toggleMobileMenu();
toggleTheme();
checkVisits();
loadLinks();
loadWeather();