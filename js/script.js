/*=============== CHANGE BACKGROUND HEADER =============== */
function scrollHeader() {
  const header = document.querySelector(".header");

  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

/*=============== HAMBURGER TO CLOSE ICON =============== */
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

/*=============== SWIPER TRENDING =============== */
var swiperTrending = new Swiper(".trending__swiper", {
  spaceBetween: 32,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*=============== SWIPER TESTIMONIALS =============== */
var swiperTestimonial = new Swiper(".testimonials__container", {
  spaceBetween: 32,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*=============== NEWSLETTER VALIDATION =============== */
const newsletterButton = document.getElementById("submit");
const newsletterName = document.getElementById("name");
const newsletterEmail = document.getElementById("email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");

function validateNewsletter(e) {
  e.preventDefault();

  // Get the values from the input fields
  const nameValue = newsletterName.value;
  const emailValue = newsletterEmail.value;

  // Clear any existing error messages
  nameError.classList.remove("show");
  emailError.classList.remove("show");

  if (nameValue === "") {
    nameError.classList.add("show");
  } else if (emailValue === "") {
    emailError.classList.add("show");
  } else {
    // Clear the input fields
    newsletterName.value = "";
    newsletterEmail.value = "";
  }
}

newsletterButton.addEventListener("click", validateNewsletter);
