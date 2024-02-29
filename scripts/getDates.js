const yearEl = document.querySelector("#jsYear");
yearEl.textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;