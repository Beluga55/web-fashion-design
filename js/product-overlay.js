const trendingBtn = document.querySelectorAll(".trending__button");
const trendingOverlay = document.querySelector(".add__cart-overlay");
const body = document.querySelector("body");
const productCart = document.querySelectorAll(".products__cart");

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

const productsContent = [
  itemContents[0],
  itemContents[1],
  itemContents[2],
  itemContents[3],
  itemContents[4],
  itemContents[5],
  itemContents[6],
  itemContents[7],
  {
    name: "Blue Paisley Tie",
    description:
      "Elevate your formal attire with this elegant blue paisley tie",
    color: "Based On The Image",
    price: "$20",
    image: "images/tie-1.jpg",
  },
  {
    name: "Classic Paisley Tie",
    description:
      "Its versatile design complements both formal and semi-formal attire.",
    color: "Based On The Image",
    price: "$25",
    image: "images/tie2.jpg",
  },
  {
    name: "Green Paisley Tie",
    description: "Make a bold statement with this green paisley tie.",
    color: "Based On The Image",
    price: "$15",
    image: "images/tie3.jpg",
  },
  {
    name: "Brown Paisley Tie",
    description: "This brown paisley tie exudes warmth and style.",
    color: "Based On The Image",
    price: "$20",
    image: "images/tie4.jpg",
  },
  {
    name: "Teal Green Paisley Tie",
    description:
      "The teal green paisley tie combines elegance with a hint of uniqueness.",
    color: "Based On The Image",
    price: "$18",
    image: "images/tie5.jpg",
  },
  {
    name: "Black Trousers",
    description:
      "A staple in any wardrobe, black trousers are versatile and suitable for various occasions.",
    color: "Based On The Image",
    price: "$55",
    image: "images/trousers1.jpg",
  },
  {
    name: "Dark Gray Trousers",
    description: "Dark gray trousers offer a refined and subdued look.",
    color: "Based On The Image",
    price: "$60",
    image: "images/trousers2.jpg",
  },
  {
    name: "Gray Trousers",
    description:
      "These gray trousers strike a balance between formal and casual.",
    color: "Based On The Image",
    price: "$40",
    image: "images/trousers3.jpg",
  },
  {
    name: "Blue Trousers",
    description: "Add a pop of color to your wardrobe with blue trousers.",
    color: "Based On The Image",
    price: "$58",
    image: "images/trousers4.jpg",
  },
  {
    name: "Casual Trousers",
    description: "Casual trousers are all about comfort and relaxation.",
    color: "Based On The Image",
    price: "$50",
    image: "images/trousers5.jpg",
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

productCart.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Update the overlay content and add the "show" class
    trendingOverlay.classList.add("show");
    body.classList.add("scroll-lock");

    const productItem = productsContent[index];
    let newProduct;

    const filter = button.getAttribute("data-filter");
    allItems.forEach(() => {
      if (filter === "tie") {
        newProduct = `
        <div>
        <div>
          <i class="fa-solid fa-arrow-left" id="arrow-left"></i>
          <img src="${productItem.image}" alt="${productItem.name}" />
        </div>

        <div class="add__cart-content">
          <h3>${productItem.name}</h3>
          <div>
            <span>Description</span>
            <p>${productItem.description}</p>
          </div>
          <div>
            <span>Color</span>
            <div class="color">
              <div>
                ${productItem.color}
              </div>
            </div>
          </div>
          <div>
            <p>${productItem.price}</p>
            <button>Add To Cart</button>
          </div>
        </div>
      </div>
        `;
      } else {
        newProduct = `
        <div>
        <div>
          <i class="fa-solid fa-arrow-left" id="arrow-left"></i>
          <img src="${productItem.image}" alt="${productItem.name}" />
        </div>

      <div class="add__cart-content">
        <h3>${productItem.name}</h3>
        <div>
          <span>Description</span>
          <p>${productItem.description}</p>
        </div>
        <div>
          <span>Color</span>
          <div class="color">
            <div>
              ${productItem.color}
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
          <p>${productItem.price}</p>
          <button>Add To Cart</button>
        </div>
      </div>
      </div>
        `;
      }
    });

    trendingOverlay.innerHTML = newProduct;
  });
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-arrow-left")) {
    trendingOverlay.classList.remove("show");
    body.classList.remove("scroll-lock");
  }
});