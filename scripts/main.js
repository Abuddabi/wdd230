import "./getDates.js";

const host = window.location.hostname;
if (host.includes("github")) {
  const anchors = document.querySelectorAll("a");

  anchors.forEach(a => {
    const href = a.getAttribute("href");
    if (href.startsWith("/")) a.setAttribute("href", `/wdd230${href}`);
  });
}