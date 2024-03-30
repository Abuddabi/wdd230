const mobMenuBtn = document.querySelector("#js-mob-menu-btn");
const nav = mobMenuBtn.parentNode;

mobMenuBtn.addEventListener("click", function () {
  nav.classList.toggle("js-mobile-open");
});

const lastModifiedEl = document.querySelector("#js-last-mod");
lastModifiedEl.textContent = document.lastModified;

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

function directoryPage() {
  const container = document.querySelector("#js-directories-container");
  if (!container) return;

  function loadMembers() {
    const baseURL = window.location.hostname.includes("github") ? "https://abuddabi.github.io/wdd230/" : "http://127.0.0.1:5500/";
    const url = `${baseURL}/chamber/data/members.json`;

    async function getMembers() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          displayMembers(data);
        } else {
          throw Error(await response.text());
        }
      } catch (error) {
        console.error(error);
      }
    }

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
updateCalendar();
checkVisits();
formOnJoinPage();
thankyouPage();
directoryPage();