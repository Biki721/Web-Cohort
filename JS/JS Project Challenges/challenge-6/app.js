const digitalClock = document.querySelector(".digital-clock");
const clock = document.querySelector(".clock");

function updateClock() {
  const time = new Date();
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  digitalClock.textContent = `${hours}:${minutes}:${seconds}`;

  const hoursDeg = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const minutesDeg = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const secondsDeg = time.getSeconds() * 6;

  document.querySelector(
    ".hour"
  ).style.transform = `translateX(-50%) rotate(${hoursDeg}deg)`;

  document.querySelector(
    ".minute"
  ).style.transform = `translateX(-50%) rotate(${minutesDeg}deg)`;

  document.querySelector(
    ".second"
  ).style.transform = `translateX(-50%) rotate(${secondsDeg}deg)`;

  const date = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  document.querySelector(".date").textContent = date;
}

function createClockNumbers() {
  for (let i = 1; i <= 12; i++) {
    const number = document.createElement("div");
    number.classList.add("number");
    number.innerHTML = `<span>${i}</span>`;
    number.style.setProperty("--rotation", `${i * 30}deg`);
    clock.appendChild(number);
  }
}

createClockNumbers();
updateClock();
setInterval(updateClock, 1000);
