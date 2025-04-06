const accordion = document.querySelector(".accordion");

accordion.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("arrow")) {
    target = target.parentElement;
    console.log(target);
  }

  if (target.classList.contains("accordion-button")) {
    const activeButtons = document.querySelectorAll(".accordion-button.active");
    activeButtons.forEach((button) => {
      if (button !== target) {
        button.classList.remove("active");
        button.nextElementSibling.style.maxHeight = null;
      }
    });

    target.classList.toggle("active");
    target.nextElementSibling.style.maxHeight
      ? (target.nextElementSibling.style.maxHeight = null)
      : (target.nextElementSibling.style.maxHeight =
          target.nextElementSibling.scrollHeight + "px");
  }
});
