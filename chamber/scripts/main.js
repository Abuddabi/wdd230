const mobMenuBtn = document.querySelector("#js-mob-menu-btn");
const nav = mobMenuBtn.parentNode;

mobMenuBtn.addEventListener("click", function () {
  nav.classList.toggle("js-mobile-open");
});