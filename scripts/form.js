function formLogic() {
  const form = document.querySelector("form.form");
  if (!form) return;

  const rangevalue = form.querySelector("#js-rangevalue");
  const range = form.querySelector("#js-range");
  rangevalue.innerHTML = range.value;

  // RANGE event listener
  range.addEventListener('change', displayRatingValue);
  range.addEventListener('input', displayRatingValue);

  function displayRatingValue() {
    rangevalue.innerHTML = range.value;
  }


  const pass = form.querySelector("#js-password");
  const pass2 = form.querySelector("#js-password2");
  const passErrMsg = form.querySelector("#js-password-error-msg");

  pass2.addEventListener("focusout", function () {
    if (pass.value !== pass2.value) {
      passErrMsg.textContent = "Passwords are not match! Try again.";
      passErrMsg.classList.add("active");
      pass2.value = "";
      pass.value = "";
      pass.focus();
    } else {
      passErrMsg.textContent = "";
      passErrMsg.classList.remove("active");
    }
  });
}

function recordLogic() {
  const contentBLock = document.querySelector("#js-record-content");
  if (!contentBLock) return;

  const paramsList = contentBLock.querySelector("#js-params-list");
  const searchParams = new URLSearchParams(window.location.search);
  for (const param of searchParams.entries()) {
    const li = document.createElement("li");
    li.innerHTML = `${param[0]}: ${param[1]}`;
    paramsList.appendChild(li);
  }
}

formLogic();
recordLogic();