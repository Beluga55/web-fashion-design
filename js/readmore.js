const readMoreButton = document.getElementById("read-more");
const moreContent = document.getElementById("more-content");

function readMoreContent() {
  moreContent.classList.add("show");
  readMoreButton.textContent = "Read Less";
}

function readLessContent() {
  moreContent.classList.remove("show");
  readMoreButton.textContent = "Read More";
}

readMoreButton.addEventListener("click", function () {
  if (readMoreButton.textContent === "Read More") {
    readMoreContent();
  } else {
    readLessContent();
  }
});