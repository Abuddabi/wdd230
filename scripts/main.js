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

// run section
checkIfGithub();
toggleMobileMenu();