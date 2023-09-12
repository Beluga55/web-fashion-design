const buttons = document.querySelectorAll(".button");
const allItems = document.querySelectorAll(".coat__div, .tie__div");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("active__button");
    });

    button.classList.add("active__button");

    const filter = button.getAttribute("data-filter");
    allItems.forEach((item) => {
      if (filter === "all") {
        item.style.display = "block";
      } else if (filter === "coat") {
        if (item.classList.contains("tie__div")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      } else if (filter === "tie") {
        if (item.classList.contains("coat__div")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      } else {
        item.style.display = "none";
      }
    });
  });
});
