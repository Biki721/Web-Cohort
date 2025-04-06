const container = document.querySelector(".container");
const reviewInput = document.querySelector("#reviewInput");
const submit = document.querySelector("#submit");
const collectedReviews = document.querySelector(".collectedReviews");

submit.addEventListener("click", function () {
  let reviewText = reviewInput.value.trim();

  if (!reviewText) {
    alert("please enter a review");
    return;
  }
  const reviewContainers = document.querySelectorAll(".storedReview");

  for (let review of reviewContainers) {
    if (review.textContent.trim() == "") {
      review.textContent = reviewInput.value;
      reviewInput.value = "";
      return;
    }
  }

  const newReviewDiv = document.createElement("div");
  newReviewDiv.className = "storedReview";
  newReviewDiv.textContent = reviewInput.value;
  collectedReviews.appendChild(newReviewDiv);
  reviewInput.value = "";
});

container.addEventListener("click");
