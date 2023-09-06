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