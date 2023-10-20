// Function to toggle the dark theme
function toggleDarkTheme() {
  const body = document.body;
  const themeButton = document.getElementById("theme-button");
  const emptyCartImage = document.querySelector(".empty__cart-image");

  const darkTheme = "dark-theme";
  const iconTheme = "bx-sun";

  // Get the current theme and icon
  const getCurrentTheme = () =>
    body.classList.contains(darkTheme) ? "dark" : "light";
  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

  // Check the previously selected theme and icon
  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  if (selectedTheme) {
    body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
    themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
      iconTheme
    );
  }

  // Toggle the dark theme when the button is clicked
  themeButton.addEventListener("click", () => {
    body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // Check if emptyCartImage exists before manipulating it
    if (emptyCartImage) {
      if (body.classList.contains(darkTheme)) {
        emptyCartImage.src = "images/empty-cart-white.svg";
      } else {
        emptyCartImage.src = "images/empty-cart.svg";
      }
    }

    // Save the theme and icon selection
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });

  // Check and set the initial theme when the page loads
  if (body.classList.contains(darkTheme)) {
    // Check if emptyCartImage exists before manipulating it
    if (emptyCartImage) {
      emptyCartImage.src = "images/empty-cart-white.svg";
    }
  } else {
    // Check if emptyCartImage exists before manipulating it
    if (emptyCartImage) {
      emptyCartImage.src = "images/empty-cart.svg";
    }
  }
}

// Function to handle scroll header
function scrollHeader() {
  const header = document.querySelector(".header");
  const scrollThreshold = 50;

  window.addEventListener("scroll", () => {
    if (window.scrollY >= scrollThreshold) {
      header.classList.add("scroll-header");
    } else {
      header.classList.remove("scroll-header");
    }
  });
}

// Function to handle hamburger menu
function setupHamburgerMenu() {
  const hamburger = document.querySelector(".fa-bars");
  const close = document.querySelector(".fa-xmark");
  const navMenu = document.querySelector(".nav__menu");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.remove("hide");
    });
  }

  if (close) {
    close.addEventListener("click", () => {
      navMenu.classList.add("hide");
    });
  }
}

// Call the functions to set up your page
document.addEventListener("DOMContentLoaded", function () {
  toggleDarkTheme();
  scrollHeader();
  setupHamburgerMenu();
});
