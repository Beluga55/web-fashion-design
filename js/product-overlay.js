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
    color: '<div class="casual__blue"></div>',
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
    color: "<p>Based On The Image</p>",
    price: "$20",
    image: "images/tie-1.jpg",
  },
  {
    name: "Classic Paisley Tie",
    description:
      "Its versatile design complements both formal and semi-formal attire.",
    color: "<p>Based On The Image</p>",
    price: "$25",
    image: "images/tie2.jpg",
  },
  {
    name: "Green Paisley Tie",
    description: "Make a bold statement with this green paisley tie.",
    color: "<p>Based On The Image</p>",
    price: "$15",
    image: "images/tie3.jpg",
  },
  {
    name: "Brown Paisley Tie",
    description: "This brown paisley tie exudes warmth and style.",
    color: "<p>Based On The Image</p>",
    price: "$20",
    image: "images/tie4.jpg",
  },
  {
    name: "Teal Green Paisley Tie",
    description:
      "The teal green paisley tie combines elegance with a hint of uniqueness.",
    color: "<p>Based On The Image</p>",
    price: "$18",
    image: "images/tie5.jpg",
  },
  {
    name: "Black Trousers",
    description:
      "A staple in any wardrobe, black trousers are versatile and suitable for various occasions.",
    color: "<div class='casual__black'></div>",
    price: "$55",
    image: "images/trousers1.jpg",
  },
  {
    name: "Dark Gray Trousers",
    description: "Dark gray trousers offer a refined and subdued look.",
    color: "<div class='casual__dark'></div>",
    price: "$60",
    image: "images/trousers2.jpg",
  },
  {
    name: "Gray Trousers",
    description:
      "These gray trousers strike a balance between formal and casual.",
    color: "<div class='casual__lightgray'></div>",
    price: "$40",
    image: "images/trousers3.jpg",
  },
  {
    name: "Blue Trousers",
    description: "Add a pop of color to your wardrobe with blue trousers.",
    color: "<div class='casual__blue'></div>",
    price: "$58",
    image: "images/trousers4.jpg",
  },
  {
    name: "Casual Trousers",
    description: "Casual trousers are all about comfort and relaxation.",
    color: "<div class='casual__white'></div>",
    price: "$50",
    image: "images/trousers5.jpg",
  },
];

// Define a variable to track the currently displayed product index
let currentProductIndex = null;
let cartData = {
  items: [],
};

function addToCart(productIndex, size) {
  // Get the product details
  const itemContent = productsContent[productIndex];

  // Check if the product already exists in the cart
  const existingProduct = cartData.items.find((item) => {
    // Compare name, color, and size (or check for items without size)
    if (item.name === itemContent.name && item.color === itemContent.color) {
      if (
        (item.size === size && size !== "") || // Check if sizes match
        (!item.size && !size) // Handle items without sizes
      ) {
        return true; // Product with the same attributes already exists
      }
    }
    return false;
  });

  if (existingProduct) {
    // If the product already exists, increment the quantity
    existingProduct.quantity += 1;
  } else {
    // If not, create a new object and add it to the cart
    const product = {
      image: itemContent.image,
      description: itemContent.description,
      name: itemContent.name,
      color: itemContent.color,
      price: itemContent.price,
      quantity: 1, // Initialize quantity to 1 for new items
    };

    // Add size only if it's provided and not an empty string
    if (size !== undefined && size !== "") {
      product.size = size;
    }

    // Add the product to the cart
    cartData.items.push(product);
  }

  // Store the updated cart data in localStorage
  localStorage.setItem("cart", JSON.stringify(cartData));

  // Update cart quantity display
  const countQuantity = document.querySelector(".count__quantity");
  countQuantity.textContent = cartData.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

// Function to update cart quantity on page load
function updateCartQuantity() {
  // Retrieve cart data from localStorage
  const cartDataJSON = localStorage.getItem("cart");
  if (cartDataJSON) {
    cartData = JSON.parse(cartDataJSON);
    // Update cart quantity display
    const countQuantity = document.querySelector(".count__quantity");
    countQuantity.textContent = cartData.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    // Cart Data Items Length
  }
}

trendingBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Update the overlay content and add the "show" class
    trendingOverlay.classList.add("show");
    body.classList.add("scroll-lock");

    const itemContent = itemContents[index];
    currentProductIndex = index;

    const newContent = `
      <div>
        <div>
        <div class="arrow__border">
          <i class="fa-solid fa-arrow-left" id="arrow-left"></i>
        </div>
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
            <div class="active__color">
              ${itemContent.color}
            </div>
          </div>
        </div>
        <div>
          <span>Size</span>
          <div class="size__selection">
            <span class="size__button active__size">S</span>
            <span class="size__button">M</span>
            <span class="size__button">L</span>
            <span class="size__button">XL</span>
            <span class="size__button">XXL</span>
          </div>
        </div>
        <div>
          <p>${itemContent.price}</p>
          <button id="add-to-cart-button">Add To Cart</button>
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
    currentProductIndex = index;
    let newProduct;

    const filter = button.getAttribute("data-filter");
    allItems.forEach(() => {
      if (filter === "tie") {
        newProduct = `
        <div>
        <div>
        <div class="arrow__border">
          <i class="fa-solid fa-arrow-left" id="arrow-left"></i>
        </div>
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
            <button id="add-to-cart-button">Add To Cart</button>
          </div>
        </div>
      </div>
        `;
      } else {
        newProduct = `
        <div>
        <div>
        <div class="arrow__border">
          <i class="fa-solid fa-arrow-left" id="arrow-left"></i>
        </div>
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
            <div class="active__color">
              ${productItem.color}
            </div>
          </div>
        </div>
        <div>
          <span>Size</span>
          <div class="size__selection">
            <span class="size__button active__size">S</span>
            <span class="size__button">M</span>
            <span class="size__button">L</span>
            <span class="size__button">XL</span>
            <span class="size__button">XXL</span>
          </div>
        </div>
        <div>
          <p>${productItem.price}</p>
          <button id="add-to-cart-button">Add To Cart</button>
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

  if (event.target.id === "add-to-cart-button") {
    event.preventDefault();

    if (currentProductIndex !== null) {
      // Get the selected size with the active__size class
      const selectedSizeElement = document.querySelector(
        ".size__button.active__size"
      );

      // Check if selectedSizeElement is found, and get the selected size or set it to an empty string
      const selectedSize = selectedSizeElement
        ? selectedSizeElement.textContent
        : "";

      addToCart(currentProductIndex, selectedSize);
    }

    trendingOverlay.classList.remove("show");
  }

  if (event.target.classList.contains("size__button")) {
    const allSizeItems = document.querySelectorAll(".size__button");

    allSizeItems.forEach((sizeButton) => {
      sizeButton.classList.remove("active__size");
    });

    event.target.classList.add("active__size");
  }
});

// Update cart quantity on page load
updateCartQuantity();
