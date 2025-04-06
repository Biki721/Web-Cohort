const gameContainer = document.getElementById("gameContainer");

const originalEmojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

let emojis = [];
let matchedCards = [];
let flippedCards = [];
let moves = 0;
let timer = 0;
let seconds = 0;

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById("time").textContent = `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

function shuffle(array) {
  let randomIndex;
  const shuffledArray = [...array, ...array];
  let currentIndex = shuffledArray.length;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }
  return shuffledArray;
}

function startGame() {
  gameContainer.innerHTML = "";

  startTimer();
  emojis = shuffle(originalEmojis);
  emojis.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="card-front">?</div>
    <div class="card-back">${emoji}</div>`;
    card.addEventListener("click", function () {
      card.classList.add("flipped");
      flippedCards.push(card);

      if (flippedCards.length == 2) {
        moves++;
        document.getElementById("moves").textContent = moves;
        if (
          flippedCards[0].querySelector(".card-back").textContent.trim() ===
          flippedCards[1].querySelector(".card-back").textContent.trim()
        ) {
          matchedCards.push(flippedCards[0], flippedCards[1]);
          flippedCards.length = 0;
          if (matchedCards.length === emojis.length) {
            clearInterval(timer);
            setTimeout(
              () =>
                alert(`You won in ${moves} moves and in ${seconds} seconds!`),
              500
            );
          }
        } else {
          setTimeout(() => {
            flippedCards[0].classList.remove("flipped");
            flippedCards[1].classList.remove("flipped");
            flippedCards.length = 0;
          }, 1000);
        }
      }
    });
    gameContainer.appendChild(card);
  });
}

function restartGame() {
  clearInterval(timer);
  moves = 0;
  seconds = 0;
  matchedCards = [];
  flippedCards = [];
  document.getElementById("moves").textContent = moves;
  document.getElementById("time").textContent = "0:00";
  startGame();
}
