const mobMenuBtn = document.querySelector("#js-mob-menu-btn");
const nav = mobMenuBtn.parentNode;

mobMenuBtn.addEventListener("click", function () {
  nav.classList.toggle("js-mobile-open");
});

const lastModifiedEl = document.querySelector("#js-last-mod");
lastModifiedEl.textContent = document.lastModified;