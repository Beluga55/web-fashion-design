// Get a reference to the container where you want to display cart items
const cartContainer = document.querySelector(".cart__content");
const countQuantity = document.querySelector(".count__quantity");
const redirectBtn = document.querySelector(".redirect__product-btn");

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
    const cartData = JSON.parse(cartDataJSON);
    const cartItems = cartData.items;

    // Clear the existing content of cartContainer
    cartContainer.innerHTML = "";

    // Loop through the cart items and create HTML elements for each item
    cartItems.forEach((item, index) => {
      // Create a div element for the cart item
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart__item");

      // Create the HTML structure
      const newItems = `
          <div>
            <img src="${item.image}" alt="${item.name}" />

            <div class="cart__product-description">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <div>
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
                  <p>${item.size}</p>
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
  }
}

// Event delegation for the redirect button
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("redirect__product-btn")) {
    // Handle the button click here
    window.location.href = "products.html";
  }
});

// Call the function to display cart items when the page loads
displayCartItems();

// Call the function to display "There is no items in the cart" on page load
if (countQuantity.textContent === "0") {
  displayEmptyCartMessage();
}
