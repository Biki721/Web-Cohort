const reviewSection = document.querySelector(".reviewSection");
const reviewInput = document.querySelector("#reviewInput");
const submit = document.querySelector("#submit");
const collectedReviews = document.querySelector(".collectedReviews");
const stars = document.querySelectorAll(".star");
let selectedCount = 0;
const reviewContainers = document.querySelectorAll(".storedReview");

function resetStars() {
  stars.forEach((star) => {
    star.style.color = "black"; // Default color
  });
  selectedCount = 0;
}

function highlightStars() {
  stars.forEach((star, index) => {
    star.style.color = index < selectedCount ? "yellow" : "black";
  });
}

reviewSection.addEventListener("click", function (e) {
  e.preventDefault();
  let reviewText = reviewInput.value.trim();
  console.log(e.target.className);

  if (e.target.className === "star") {
    selectedCount = parseInt(e.target.id);
    highlightStars();
  }

  if (e.target.id === "submit") {
    if (!reviewText || !selectedCount) {
      alert("Please give a review to submit");
      return;
    }

    for (let review of reviewContainers) {
      let reviewText = review.children[0];
      let reviewStar = review.children[1];
      console.log(reviewStar);

      if (reviewText.textContent.trim() === "") {
        reviewText.textContent = reviewInput.value;
        reviewStar.textContent = `⭐${selectedCount}`;
        reviewInput.value = "";
        resetStars();

        return;
      }
    }
    const newReviewDiv = document.createElement("div");
    newReviewDiv.className = "storedReview";

    newReviewDiv.innerHTML = `
    <span class="text">${reviewInput.value}</span>
    <span class="textStar">⭐${selectedCount}</span>
    `;
    collectedReviews.appendChild(newReviewDiv);
    reviewInput.value = "";
    resetStars();
    return;
  }
});
