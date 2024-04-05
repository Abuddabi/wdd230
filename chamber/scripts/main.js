const mobMenuBtn = document.querySelector("#js-mob-menu-btn");
const nav = mobMenuBtn.parentNode;

mobMenuBtn.addEventListener("click", function () {
  nav.classList.toggle("js-mobile-open");
});

const lastModifiedEl = document.querySelector("#js-last-mod");
lastModifiedEl.textContent = document.lastModified;

function loadWeather() {
  const weatherContainer = document.querySelector("#js-weather");
  if (!weatherContainer) return;

  const weatherAPI_LSkey = "WEATHER_API_KEY";
  let apiKey = localStorage.getItem(weatherAPI_LSkey);

  if (!apiKey) {
    const inputId = "js-weather-api";
    const submitId = "js-weather-submit";
    weatherContainer.innerHTML = `
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
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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
    displayTodaysWeather(data);
    displayForecast(data);
  }

  function displayTodaysWeather(data) {
    const todayData = data.list[0];
    let description = todayData.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.slice(1);
    const icon = todayData.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/w/${icon}.png`;

    const weatherToday = weatherContainer.querySelector("#js-weather-today");
    weatherToday.innerHTML = `
      <img class="js-weather-icon" src="${iconURL}" alt="Weather icon - ${description}.">
      <div>${todayData.main.temp}&deg;C</div>
      <div class="bold">${description}</div>
    `;
  }

  function displayForecast(data) {
    function getDate(data) {
      const timestamp = data.dt * 1000;
      const date = new Date(timestamp);
      return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
    }

    const weatherForecast = weatherContainer.querySelector("#js-weather-forecast");
    const daysAmount = 3;
    const indexRange = 8; // forecast for every 3 hours. 3 * 8 = 24 - a day.

    for (let i = indexRange; i <= (indexRange * daysAmount); i += indexRange) {
      weatherForecast.innerHTML += `
        <div>
          <div class="bold">${getDate(data.list[i])}</div>
          <div>${data.list[i].main.temp}&deg;C</div>
        </div>
      `;
    }
  }
}

function banner() {
  const bannerWrapper = document.querySelector("#js-banner");
  if (!bannerWrapper) return;

  const body = document.querySelector("body");
  const bodyOpenBannerClass = "js-banner-active";

  const today = new Date().getDay();
  const daysForBanner = [1, 2, 3]; // 0 - Sunday,  1 - Monday etc.
  if (daysForBanner.includes(today)) {
    bannerWrapper.classList.add("active");
    body.classList.add(bodyOpenBannerClass);
  }

  function closeBanner() {
    bannerWrapper.classList.remove("active");
    body.classList.remove(bodyOpenBannerClass);
  }
  const close = bannerWrapper.querySelector("#js-close-banner");
  close.addEventListener("click", closeBanner);

  bannerWrapper.addEventListener("click", function (event) {
    if (event.target === this) closeBanner();
  });
}

async function loadSpotlights() {
  const spotlightsBlock = document.querySelector("#js-spotlights");
  if (!spotlightsBlock) return;

  let members = await getMembers();
  if (!members) return;
  else {
    members = members.filter(m => m.membership === "silver" || m.membership === "gold");
    const spotlights = [];
    const twoOrThree = Math.round(Math.random() + 2);

    for (let i = 0; i < twoOrThree; i++) {
      const randomIndex = Math.floor(Math.random() * members.length);
      spotlights.push(members[randomIndex]);
      members.splice(randomIndex, 1);
    }
    displaySpotlights(spotlights);
  }

  function displaySpotlights(members) {
    members.forEach(m => {
      spotlightsBlock.innerHTML += `
        <div class="js-spotlight-item">
          <h3>${m.name}</h3>
          <p class="tar mb10">${m.address}</p>
          <a href="tel:${m.phone}">${m.phone}</a>
          <a href="${m.website}">${m.website}</a>
        </div>
      `;
    });
  }
}

function getMonthInfo(monthIndex, year) {
  const monthInfo = {};

  monthInfo.daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const monthDate = new Date(year, monthIndex, 1);
  monthInfo.firstDayOfWeek = monthDate.getDay();
  monthInfo.monthName = monthDate.toLocaleString('default', { month: 'long' });

  return monthInfo;
}

function updateCalendar() {
  const calendar = document.querySelector("#js-calendar");
  if (!calendar) return;

  const month = calendar.querySelector("#js-month");
  const datesContainer = calendar.querySelector("#js-calendar-dates");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  let monthIndex = currentMonth;
  let year = 2024;

  function populateCalendar(monthIndex) {
    const monthInfo = getMonthInfo(monthIndex, year);
    month.textContent = `${monthInfo.monthName}, ${year}`;

    datesContainer.innerHTML = "";
    for (let i = 0; i < monthInfo.firstDayOfWeek; i++) {
      const span = document.createElement("span");
      datesContainer.appendChild(span);
    }

    for (let i = 1; i <= monthInfo.daysInMonth; i++) {
      const span = document.createElement("span");
      span.textContent = i;
      if (monthIndex == currentMonth && i == currentDay) span.classList.add("current");
      datesContainer.appendChild(span);
    }
  }

  populateCalendar(monthIndex);

  const arrows = calendar.querySelectorAll(".js-arrow");
  arrows.forEach(arrow => arrow.addEventListener("click", function () {
    const dir = this.dataset.dir;

    if (dir == "left") monthIndex--;
    else if (dir == "right") monthIndex++;

    if (monthIndex < 0) {
      monthIndex = 11;
      year--;
    } else if (monthIndex > 11) {
      monthIndex = 0;
      year++;
    }

    populateCalendar(monthIndex);
  }));
}

function checkVisits() {
  const visitsEl = document.querySelector("#js-visits");
  if (!visitsEl) return;

  const visitsLSKey = "lastVisitInMillisec";
  const msToDays = 84600000; /* milliseconds in a day */
  const now = Date.now();
  let visitPhrase = "";
  const lastVisit = Number(window.localStorage.getItem(visitsLSKey)) || 0;
  const between = now - lastVisit;

  if (lastVisit == 0) {
    visitPhrase = "Welcome! Let us know if you have any questions.";
  } else if (between < msToDays) {
    visitPhrase = "Back so soon! Awesome!";
  } else {
    const betweenDays = (between / msToDays).toFixed();
    const s = betweenDays > 1 ? "s" : "";
    visitPhrase = `You last visited ${betweenDays} day${s} ago.`;
  }
  visitsEl.textContent = visitPhrase;
  localStorage.setItem(visitsLSKey, now);
}

function formOnJoinPage() {
  const form = document.querySelector("#js-join-form");
  if (!form) return;

  form.querySelector("#js-timestamp").value = new Date().getTime();

}

function thankyouPage() {
  const paramsList = document.querySelector("#js-form-result");
  if (!paramsList) return;

  const searchParams = new URLSearchParams(window.location.search);
  for (const param of searchParams.entries()) {
    const li = document.createElement("li");
    li.innerHTML = `${param[0]}: ${param[1]}`;
    paramsList.appendChild(li);
  }
}

async function getMembers() {
  const baseURL = window.location.hostname.includes("github") ? "https://abuddabi.github.io/wdd230/" : "http://127.0.0.1:5500/";
  const url = `${baseURL}/chamber/data/members.json`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      return data;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

function directoryPage() {
  const container = document.querySelector("#js-directories-container");
  if (!container) return;

  async function loadMembers() {
    const members = await getMembers();
    if (!members) return;
    else displayMembers(members);

    function displayMembers(members) {
      container.querySelector("#js-cards-wrapper").innerHTML += members.map(m => `
        <div class="directory-card">
          <div class="directory-img-container">
            <img class="directory-img" src="images/directories/${m.image}" alt="Logo of ${m.name}. ${m.otherInfo}." width="300" height="200" loading="lazy">
          </div>
          <p>${m.name}</p>
          <p>${m.address}</p>
          <p>${m.phone}</p>
          <a href="${m.website}">${m.website}</a>
        </div>
      `).join("");
    }

    getMembers();
  }

  function changeView() {
    const toGrid = container.querySelector("#js-to-grid");
    const toList = container.querySelector("#js-to-list");

    [toGrid, toList].forEach(btn => btn.addEventListener("click", function () {
      if (this.dataset.view === container.dataset.view) return;
      container.dataset.view = this.dataset.view;
    }));
  }

  loadMembers();
  changeView();
}

/* RUN SECTION */
banner();
loadWeather();
loadSpotlights();
updateCalendar();
checkVisits();
formOnJoinPage();
thankyouPage();
directoryPage();