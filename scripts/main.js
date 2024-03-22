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

// run section
checkIfGithub();
toggleMobileMenu();
toggleTheme();
checkVisits();