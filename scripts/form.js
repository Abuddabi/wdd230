const rangevalue = document.getElementById("js-rangevalue");
const range = document.getElementById("js-range");
rangevalue.innerHTML = range.value;

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
  rangevalue.innerHTML = range.value;
}