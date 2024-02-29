import "./getDates.js";

const host = window.location.hostname;
if (host.includes("github")) {
  const card = document.querySelector(".card.activities");
  const anchors = card.querySelectorAll("a");

  anchors.forEach(a => {
    const href = a.getAttribute("href");
    if (href.startsWith("/")) a.setAttribute("href", `/wdd230${href}`);
  });
}