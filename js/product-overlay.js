const trendingBtn = document.querySelectorAll(".trending__button");
const trendingOverlay = document.querySelector(".add__cart-overlay");
const body = document.querySelector("body");

// Define the content for each item
const itemContents = [
  {
    name: "Tuxedo Jacket",
    description: "Worn for black-tie events and formal occasions",
    color: '<div class="casual__brown"></div>',
    price: "$200",
    image: "images/coat1.jpg",
  },
  {
    name: "Bomber Jacket",
    description: "Perfect choice for casual outings and everyday wear",
    color: '<div class="casual__dark"></div>',
    price: "$150",
    image: "images/coats2.jpg",
  },
  {
    name: "Casual Coat",
    description: "Suitable for everyday activities and casual outings",
    color: '<div class="casual__black"></div>',
    price: "$120",
    image: "images/coat3.jpg",
  },
  {
    name: "Blazer",
    description: "Suitable for both casual and semi-formal events",
    color: '<div class="casual__blue"></div><div class="casual__black"></div>',
    price: "$175",
    image: "images/coat4.jpg",
  },
  {
    name: "Sports Coat",
    description: "Great for a range of smart-casual events",
    color: '<div class="casual__gray"></div>',
    price: "$200",
    image: "images/coat5.jpg",
  },
  {
    name: "Long Coat",
    description: "Ideal for keeping warm during cold seasons",
    color: '<div class="casual__brown"></div>',
    price: "$225",
    image: "images/coat6.jpg",
  },
  {
    name: "Pea Coat",
    description: "Suitable for colder climates and stylish everyday wear",
    color: '<div class="casual__dark"></div>',
    price: "$165",
    image: "images/coat7.jpg",
  },
  {
    name: "Trench Coat",
    description: "Great for both rainy and transitional weather",
    color: '<div class="casual__brown"></div>',
    price: "$275",
    image: "images/coat8.jpg",
  },
];

trendingBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Update the overlay content and add the "show" class
    trendingOverlay.classList.add("show");
    body.classList.add("scroll-lock");

    const itemContent = itemContents[index];

    const newContent = `
      <div>
        <div>
          <i class="fa-solid fa-arrow-left" id="arrow-left"></i>
          <img src="${itemContent.image}" alt="${itemContent.name}" />
        </div>

      <div class="add__cart-content">
        <h3>${itemContent.name}</h3>
        <div>
          <span>Description</span>
          <p>${itemContent.description}</p>
        </div>
        <div>
          <span>Color</span>
          <div class="color">
            <div>
              ${itemContent.color}
            </div>
          </div>
        </div>
        <div>
          <span>Size</span>
          <div class="size__selection">
            <span class="active__size">S</span>
            <span>M</span>
            <span>L</span>
            <span>XL</span>
            <span>XXL</span>
          </div>
        </div>
        <div>
          <p>${itemContent.price}</p>
          <button>Add To Cart</button>
        </div>
      </div>
      </div>
    `;

    trendingOverlay.innerHTML = newContent;
  });
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-arrow-left")) {
    trendingOverlay.classList.remove("show");
    body.classList.remove("scroll-lock");
  }
});
