/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.querySelector(".header");

  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

/*=============== HAMBURGER TO CLOSE ICON ===============*/
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

/*=============== SWIPER ===============*/
var swiperTrending = new Swiper(".trending__swiper", {
  spaceBetween: 32,
  // grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});