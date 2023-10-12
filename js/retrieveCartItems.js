// Get a reference to the container where you want to display cart items
const cartContainer = document.querySelector(".cart__content");
const countQuantity = document.querySelector(".count__quantity");
const redirectBtn = document.querySelector(".redirect__product-btn");
const discoverMore = document.querySelectorAll(".discover-more");

// Function to display "There is no items in the cart" message
function displayEmptyCartMessage() {
  // Clear the existing content of cartContainer
  cartContainer.innerHTML = "";
  cartContainer.style.display = "block";

  const outerdiv = document.createElement("div");

  const imageDiv = document.createElement("div");
  imageDiv.style.display = "flex";
  imageDiv.style.alignItems = "center";
  imageDiv.style.justifyContent = "center";
  imageDiv.style.marginBottom = "1rem";

  const emptyCartImage = document.createElement("img");
  emptyCartImage.classList.add("empty__cart-image");
  emptyCartImage.src = "images/empty-cart.svg";
  emptyCartImage.alt = "empty-cart";

  const emptyElement = document.createElement("p");
  emptyElement.classList.add("empty__text");
  emptyElement.textContent = "Oops, Your Shopping Cart Is Empty";

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-wrapper");

  const redirectProduct = document.createElement("button");
  redirectProduct.classList.add("redirect__product-btn");
  redirectProduct.textContent = "Discover Our Products";

  cartContainer.appendChild(imageDiv);
  imageDiv.appendChild(emptyCartImage);
  cartContainer.appendChild(outerdiv);
  outerdiv.appendChild(emptyElement);
  outerdiv.appendChild(buttonDiv);
  buttonDiv.appendChild(redirectProduct);
}

function displayCartItems() {
  // Get the cart items from localStorage
  const cartDataJSON = localStorage.getItem("cart");
  if (cartDataJSON) {
    const cartItems = JSON.parse(cartDataJSON).items; // Parse items directly

    // Get the checked status of all checkboxes before clearing cartContainer
    const checkedStatus = Array.from(
      document.querySelectorAll(".cart__checkbox")
    ).map((checkbox) => checkbox.checked);

    // Clear the existing content of cartContainer
    cartContainer.innerHTML = "";

    // Initialize the total price
    let totalPrice = 0;

    // Loop through the cart items and create HTML elements for each item
    cartItems.forEach((item, index) => {
      // Create a div element for the cart item
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart__item");

      // Create the HTML structure
      const newItems = `
          <div>
          <input type="checkbox" class="cart__checkbox" data-index="${index}" ${
        checkedStatus[index] ? "checked" : ""
      }/>
            <img src="${item.image}" alt="${item.name}" />

            <div class="cart__product-description">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <div class="size__color-div">
                <div>
                  <span>Color</span>
                  <div class="active__color">
                    ${item.color}
                  </div>
                </div>
                ${
                  item.size
                    ? `
                <div>
                  <span>Size</span>
                  <p class="cart__item-size">${item.size}</p>
                </div>`
                    : ""
                }
              </div>
              <div class="cart__cta">
                <h3>${item.price}</h3>
                <div class="cart__buttons">
                  <button class="decrement-button" data-index="${index}">-</button>
                  <p>${item.quantity}</p>
                  <button class="increment-button" data-index="${index}">+</button>
                </div>
              </div>
            </div>
          </div>
        `;

      // Set the innerHTML of the cartItemElement to the newContent
      cartItemElement.innerHTML = newItems;

      // Append the cartItemElement to the cart container
      cartContainer.appendChild(cartItemElement);

      // Add event listeners for the checkboxes
      const checkboxes = document.querySelectorAll(".cart__checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", updateTotalPrice);
      });
    });

    // Add event listeners for decrement and increment buttons
    const decrementButtons = document.querySelectorAll(".decrement-button");
    const incrementButtons = document.querySelectorAll(".increment-button");

    decrementButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        decrementCartItem(index);
      });
    });

    incrementButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        incrementCartItem(index);
      });
    });

    // Create an element to display the total price below all cart items
    const totalElement = document.createElement("div");
    totalElement.classList.add("cart__checkout-wrapper");

    const paragraphElement = document.createElement("p");
    paragraphElement.classList.add("cart__total-price");
    paragraphElement.textContent = `Total Price: $`;

    const priceSpan = document.createElement("span");
    priceSpan.classList.add("initial-price");
    priceSpan.textContent = `${totalPrice.toFixed(2)}`;

    const checkoutButton = document.createElement("button");
    checkoutButton.classList.add("cart__checkout-button");
    checkoutButton.textContent = "Checkout Now";

    // Append the totalElement to the cartContainer
    cartContainer.appendChild(totalElement);
    totalElement.appendChild(paragraphElement);
    paragraphElement.appendChild(priceSpan);
    totalElement.appendChild(checkoutButton);
  } else {
    // If there's no cart data, display "There is no items in the cart."
    displayEmptyCartMessage();
  }
}

// Decrement cart item quantity
function decrementCartItem(index) {
  // Get the cart data from localStorage
  const cartDataJSON = localStorage.getItem("cart");
  if (cartDataJSON) {
    const cartData = JSON.parse(cartDataJSON);
    const cartItems = cartData.items;

    // Decrease the quantity of the specified item
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
    } else {
      // Remove the item if quantity is 1 or less
      cartItems.splice(index, 1);
    }

    // Update the cart data in localStorage
    localStorage.setItem("cart", JSON.stringify(cartData));

    countQuantity.textContent = cartData.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Refresh the cart display
    displayCartItems();

    // Update the cart total based on selected checkboxes
    updateTotalPrice();

    // Update the localstorage for selectedItems
    updateSelectedItems();

    // If the cart becomes empty, display "There is no items in the cart."
    if (countQuantity.textContent === "0") {
      displayEmptyCartMessage();
    }
  }
}

// Increment cart item quantity
function incrementCartItem(index) {
  // Get the cart data from localStorage
  const cartDataJSON = localStorage.getItem("cart");
  if (cartDataJSON) {
    const cartData = JSON.parse(cartDataJSON);
    const cartItems = cartData.items;

    // Increase the quantity of the specified item
    cartItems[index].quantity++;

    // Update the cart data in localStorage
    localStorage.setItem("cart", JSON.stringify(cartData));

    // Increment the cart quantity display
    countQuantity.textContent = (
      parseInt(countQuantity.textContent) + 1
    ).toString();

    // Refresh the cart display
    displayCartItems();

    // Update the cart total based on selected checkboxes
    updateTotalPrice();

    // Increment the localstorage for selected items
    updateSelectedItems();
  }
}

function updateTotalPrice() {
  // Get all the checkboxes
  const checkboxes = document.querySelectorAll(".cart__checkbox");

  // Get the cart items from localStorage
  const cartDataJSON = localStorage.getItem("cart");

  if (cartDataJSON) {
    const cartItems = JSON.parse(cartDataJSON).items;
    let totalPrice = 0;

    // Loop through checkboxes and calculate the total price based on checked items
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        const numericPrice = parseFloat(
          cartItems[index].price.replace(/[^0-9.]/g, "")
        );
        totalPrice += numericPrice * cartItems[index].quantity;
      }
    });

    // Display the total price in the totalElement
    const priceSpan = document.querySelector(".initial-price");
    priceSpan.textContent = `${totalPrice.toFixed(2)}`;
  }
}

// Event delegation for (Click)
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("redirect__product-btn")) {
    // Handle the button click here
    window.location.href = "products.html";
  }
  if (event.target.classList.contains("cart__checkout-button")) {
    window.location.href = "checkout.html";
  }
});

// Function to update the selected items in local storage
function updateSelectedItems() {
  const selectedItems = [];
  let totalPrice = 0;
  const checkboxes = document.querySelectorAll(".cart__checkbox");
  const cartItems = document.querySelectorAll(".cart__item");

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const cartItem = cartItems[index];
      const image = cartItem.querySelector("img").src;
      const name = cartItem.querySelector("h3").textContent;
      const color = cartItem.querySelector(".active__color").innerHTML;
      let sizeElement = cartItem.querySelector(".cart__item-size");
      let size = sizeElement ? sizeElement.textContent : ""; // Default to "No Size" if size is not found
      const quantity = parseInt(
        cartItem.querySelector(".cart__buttons p").textContent
      );
      const price = parseFloat(
        cartItem.querySelector(".cart__cta h3").textContent.replace("$", "")
      );

      // Calculate the subtotal for the current item and add it to the total price
      const subtotal = quantity * price;
      totalPrice += subtotal;

      // Push all the items into array
      selectedItems.push({ image, name, color, quantity, price, size });
    }
  });
  // Store the total price in local storage
  localStorage.setItem("totalPrice", totalPrice.toFixed(2));

  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}

// Event delegation for (Change)
document.addEventListener("change", (event) => {
  if (event.target.classList.contains("cart__checkbox")) {
    // Update the selected items in local storage
    updateSelectedItems();
  }
});

// Call the function to display cart items when the page loads
displayCartItems();

// Call the function to display "There is no items in the cart" on page load
if (countQuantity.textContent === "0") {
  displayEmptyCartMessage();
}

discoverMore.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "products.html";
  });
});

// Swiper Cart Things You May Like
var swiperCart = new Swiper(".cart", {
  spaceBetween: 40,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
