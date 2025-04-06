/**
 * Write your challenge solution here
 */

const toggleBtn = document.getElementById("toggleButton");
const bulb = document.getElementById("bulb");
const statusSign = document.getElementById("status");
const body = document.getElementById("body");

toggleBtn.addEventListener("click", () => {
  let currStatus = toggleBtn.innerText;
  console.log(currStatus);
  if (currStatus == "Turn On") {
    bulb.classList.remove("off");
    toggleBtn.innerText = "Turn Off";

    body.classList.add("dark-mode");

    statusSign.innerText = "Status On";
  } else {
    bulb.classList.add("off");
    toggleBtn.innerText = "Turn On";

    body.classList.remove("dark-mode");

    statusSign.innerText = "Status Off";
  }
});
