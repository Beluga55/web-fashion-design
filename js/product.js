// Refactored
const buttons = document.querySelectorAll(".button");
const allItems = document.querySelectorAll(
  ".coat__div, .tie__div, .trousers__div"
);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove "active__button" class from all buttons
    buttons.forEach((btn) => btn.classList.remove("active__button"));

    button.classList.add("active__button");

    const filter = button.getAttribute("data-filter");
    allItems.forEach((item) => {
      const itemClassList = item.classList;

      if (filter === "all" || itemClassList.contains(filter + "__div")) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});