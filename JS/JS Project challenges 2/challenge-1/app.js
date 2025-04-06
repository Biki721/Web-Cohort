const toggleButton = document.getElementById("toggleButton");
const currentStatus = document.getElementById("status");
const bulb = document.getElementById("bulb");

toggleButton.addEventListener("click", function () {
  console.log(toggleButton.textContent.trim());

  if (toggleButton.textContent.trim() == "Turn On") {
    toggleButton.textContent = "Turn Off";
    bulb.classList.remove("off");
    currentStatus.textContent = "Status: On";
    document.body.classList.add("dark-mode");

    // return;
  } else if (toggleButton.textContent.trim() == "Turn Off") {
    toggleButton.textContent = "Turn On";
    bulb.classList.add("off");
    currentStatus.textContent = "Status: Off";
    document.body.classList.remove("dark-mode");
    return;
  }
});
