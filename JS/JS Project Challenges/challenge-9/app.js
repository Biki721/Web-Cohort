const toggleBtn = document.querySelector(".toggle-btn");
const panel = document.querySelector(".panel");
const closeBtn = document.querySelector(".close-btn");

toggleBtn.addEventListener("click", () => {
  panel.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  panel.classList.remove("active");
});

panel.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-item")) {
    alert(`You clicked on ${e.target.textContent}`);
    panel.classList.remove("active");
  }
});

document.addEventListener("click", (e) => {
  if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
    console.log(panel.contains(e.target));
    console.log(toggleBtn.contains(e.target));

    panel.classList.remove("active");
  }
});
