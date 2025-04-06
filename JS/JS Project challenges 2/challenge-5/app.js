/**
 * Write your challenge solution here
 */
// Image data
const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful Mountain Landscape",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Ocean Sunset View",
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Autumn Forest Path",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Urban City Skyline",
  },
];

const carouselTrack = document.querySelector("#carouselTrack");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const caption = document.querySelector("#caption");
const carouselNav = document.querySelector("#carouselNav");
const autoPlayButton = document.querySelector("#autoPlayButton");
const timerDisplay = document.querySelector("#timerDisplay");

let currentIndex = 0;

images.forEach((img) => {
  const preload = new Image();
  preload.src = img.url;
});

function updateIndicator() {
  const indicators = document.querySelectorAll(".carousel-indicator");
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  // carouselTrack.innerHTML = `<img src="${images[currentIndex].url}" alt="${images[currentIndex].caption}" class="carousel-slide">`;
  caption.textContent = `${images[currentIndex].caption}`;
  updateIndicator();
}

carouselTrack.innerHTML = images
  .map(
    (img) =>
      `<div class='carousel-slide' style='background-image: url(${img.url})'></div>`
  )
  .join("");

images.forEach((image, index) => {
  const div = document.createElement("div");
  div.classList.add("carousel-indicator");

  if (index === currentIndex) {
    div.classList.add("active");
  }

  div.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
  carouselNav.appendChild(div);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

let isAutoPlaying = false;
let interval;
autoPlayButton.addEventListener("click", () => {
  if (isAutoPlaying) {
    clearInterval(interval);
    autoPlayButton.textContent = "Start Auto Play";
    timerDisplay.textContent = "";
    isAutoPlaying = false;
  } else {
    isAutoPlaying = true;
    autoPlayButton.textContent = "Stop Auto Play";
    let time = 5;
    interval = setInterval(() => {
      if (time > 1) {
        timerDisplay.textContent = `Next Slide in ${time}s`;
        time--;
      } else if (time === 1) {
        timerDisplay.textContent = `Next Slide in ${time}s`;
        time--;
      } else {
        time = 5;
        timerDisplay.textContent = `Next Slide in ${time}s`;
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
      }
    }, 1000);
  }
});

updateCarousel();
