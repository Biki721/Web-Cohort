const colorButtons = document.querySelector(".color-buttons");
const mainHeading = document.querySelector("#mainHeading");

colorButtons.addEventListener("click", (e) => {
  if (e.target.textContent.trim() === "Red") {
    mainHeading.style.color = "red";
  }
  if (e.target.textContent.trim() === "Green") {
    mainHeading.style.color = "green";
  }
  if (e.target.textContent.trim() === "Blue") {
    mainHeading.style.color = "blue";
  }
  if (e.target.textContent.trim() === "Purple") {
    mainHeading.style.color = "purple";
  }
  if (e.target.textContent.trim() === "Reset") {
    mainHeading.style.color = "black";
  }
});
