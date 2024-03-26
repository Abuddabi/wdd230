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

async function loadLinks() {
  const list = document.querySelector("#js-learning-links");
  if (!list) return;

  // const url = "https://abuddabi.github.io/wdd230/data/links.json";
  const url = "http://127.0.0.1:5500/data/links.json";

  async function getLinks() {
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

  const data = await getLinks();
  displayLinks(data.weeks);
}

// RUN SECTION
checkIfGithub();
toggleMobileMenu();
toggleTheme();
checkVisits();
loadLinks();