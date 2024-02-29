(() => {
  const yearEl = document.querySelector("#jsYear");
  yearEl.textContent = new Date().getFullYear();

  const lastModifiedEl = document.querySelector("#lastModified");
  lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
})();

