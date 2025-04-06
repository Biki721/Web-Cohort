const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const ageInput = document.querySelector("#ageInput");
const bioInput = document.querySelector("#bioInput");

const nameDisplay = document.querySelector("#nameDisplay");
const jobDisplay = document.querySelector("#jobDisplay");
const ageDisplay = document.querySelector("#ageDisplay");
const bioDisplay = document.querySelector("#bioDisplay");

nameInput.addEventListener("input", function () {
  nameDisplay.textContent =
    nameInput.value.trim() !== "" ? nameInput.value : "Not Provided";
});
jobInput.addEventListener("input", function () {
  jobDisplay.textContent =
    jobInput.value.trim() !== "" ? jobInput.value : "Not Provided";
});
ageInput.addEventListener("input", function () {
  ageDisplay.textContent =
    ageInput.value.trim() !== "" ? ageInput.value : "Not Provided";
});
bioInput.addEventListener("input", function () {
  bioDisplay.textContent =
    bioInput.value.trim() !== "" ? bioInput.value : "Not Provided";
});
