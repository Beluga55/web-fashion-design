const checkoutContainer = document.querySelector(".checkout__content > div");
const checkoutContent = document.querySelector(".checkout__content");

// Display Empty Checkout Structure In A Function
function displayEmptyCheckedItemsMessage() {
  // Clear The Existing Content Of Checkout Container
  checkoutContainer.innerHTML = "";

  // Start Create A Layout For Empty Message
  const emptyOuterDiv = document.createElement("div");
  emptyOuterDiv.classList.add("empty__checkout-container");

  const svg = document.createElement("img");
  svg.classList.add("svg-checkout");
  svg.src = "images/empty-cart.svg";
  svg.alt = "empty-cart";

  // Text For No Checkout Items Been Selected
  const noCheckedItemsText = document.createElement("p");
  noCheckedItemsText.classList.add("empty__checkout-text");
  noCheckedItemsText.textContent =
    "Oops, Your Checkout Seems To Be Empty, Make Sure To Check The Items From Cart";

  // Button For Returning To The Cart Page
  const redirectToCartBtn = document.createElement("button");
  redirectToCartBtn.classList.add("redirect__checkout");
  redirectToCartBtn.textContent = "Return To Cart Page";

  checkoutContainer.appendChild(emptyOuterDiv);
  emptyOuterDiv.appendChild(svg);
  emptyOuterDiv.appendChild(noCheckedItemsText);
  emptyOuterDiv.appendChild(redirectToCartBtn);
}

function displaySelectedItems() {
  // Get the checked items from local storage
  const checkedDataJSON = localStorage.getItem("selectedItems");

  function updateStyles() {
    if (checkedDataJSON) {
      const checkedItems = JSON.parse(checkedDataJSON);

      if (checkedItems.length >= 2 && window.innerWidth >= 600) {
        checkoutContainer.style.display = "grid";
        checkoutContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
        checkoutContainer.style.width = "600px";
      } else {
        // Reset the styles back to "flex"
        checkoutContainer.style.display = "flex";
        checkoutContainer.style.flexDirection = "column"; // Or whichever direction you want
        checkoutContainer.style.width = "100%";
      }

      if (checkedItems.length == 1 && window.innerWidth >= 600) {
        checkoutContainer.style.width = "600px";
        checkoutContainer.style.display = "flex";
        checkoutContainer.style.alignItems = "center";
      }
    } else {
      if (window.innerWidth >= 600) {
        checkoutContainer.style.width = "600px";
      } else {
        checkoutContainer.style.width = "100%";
      }
    }
  }

  // Add an event listener to respond to window resizing
  window.addEventListener("resize", updateStyles);
  updateStyles();

  if (checkedDataJSON) {
    const checkedItems = JSON.parse(checkedDataJSON);

    if (checkedItems.length > 0) {
      // Clear the existing content of checkoutContainer
      checkoutContainer.innerHTML = "";

      // Loop through the checkedData from selectedItems local storage
      checkedItems.forEach((item) => {
        const checkedDivElement = document.createElement("div");
        checkedDivElement.classList.add("checked__item");

        // Create The HTML structure
        const newCheckedItems = `
            <img src="${item.image}" alt="${item.name}" />
            <div class="checkout__item-content">
              <h2 class="checkout__item-name">${item.name}</h2>
              <div class="checkout__item-size-color">
                <div>
                  <p>Color</p>
                  ${item.color}
                </div>
                ${
                  item.size
                    ? `
                <div>
                  <p>Size</p>
                  <span>${item.size}</span>
                </div>`
                    : ""
                }
              </div>
              <div class="checkout__item-price-quantity">
                <div>
                  <p>$${item.price}</p>
                </div>
                <div>
                  <p><span>Quantity:</span> ${item.quantity}</p>
                </div>
              </div>
            </div>
        `;

        checkedDivElement.innerHTML = newCheckedItems;
        checkoutContainer.appendChild(checkedDivElement);
      });
    } else {
      // If there are no checked items, clear the localStorage data
      localStorage.removeItem("selectedItems");
      localStorage.removeItem("totalPrice");

      // Call the empty message function
      displayEmptyCheckedItemsMessage();
    }
  } else {
    displayEmptyCheckedItemsMessage();
  }
}

// Call the function to display cart items when the page loads
displaySelectedItems();

createFormElement();

// Event Listener For Redirect To Cart Buttons (Event Delegation Since Is Dynamic)
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("redirect__checkout")) {
    window.location.href = "cart.html";
  }
});

function createFormElement() {
  const checkedDataJSON = localStorage.getItem("selectedItems");

  if (checkedDataJSON) {
    const checkedItems = JSON.parse(checkedDataJSON);

    if (checkedItems.length > 0) {
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("details__div");

      const detailsDivh2 = document.createElement("h2");
      detailsDivh2.classList.add("section__title");
      detailsDivh2.textContent = "Details";
      detailsDivh2.style.marginTop = "5rem";

      const detailsDivP = document.createElement("p");
      detailsDivP.classList.add("section__subtitle");
      detailsDivP.textContent =
        "Please Enter The Details For Delivery And Payment Method";

      // Create The Form Below
      const formCheckout = document.createElement("form");
      formCheckout.classList.add("form__checkout");

      // Label
      const labelCheckout = document.createElement("label");
      labelCheckout.setAttribute("for", "deliveryAddress");
      labelCheckout.textContent = "Delivery Address:";
      labelCheckout.classList.add("label__checkout");

      // Input [text]
      const inputElement = document.createElement("input");
      inputElement.classList.add("input__checkout");

      // Set attributes for the input element
      inputElement.setAttribute("type", "text");
      inputElement.setAttribute("id", "deliveryAddress");
      inputElement.setAttribute("name", "deliveryAddress");
      inputElement.setAttribute("placeholder", "Enter your address");

      // Map
      const divMap = document.createElement("div");
      divMap.id = "map";

      // Create the first hidden input element for 'lat'
      const latInput = document.createElement("input");
      latInput.setAttribute("type", "hidden");
      latInput.setAttribute("id", "lat");
      latInput.setAttribute("name", "lat");

      // Create the second hidden input element for 'lng'
      const lngInput = document.createElement("input");
      lngInput.setAttribute("type", "hidden");
      lngInput.setAttribute("id", "lng");
      lngInput.setAttribute("name", "lng");

      // Create a Div Element For Select
      const selectOuterDiv = document.createElement("div");
      selectOuterDiv.classList.add("select__outer-div");

      // Create a paragraph element
      const selectParagraphElement = document.createElement("p");
      selectParagraphElement.classList.add("payment__paragraph");
      selectParagraphElement.textContent = "Choose a payment method";

      // Create a select element
      const selectElement = document.createElement("select");
      selectElement.id = "paymentMethod";
      selectElement.name = "paymentMethod";

      // Create an array of payment methods and their values
      const paymentMethods = [
        { value: "visa", label: "Visa" },
        { value: "mastercard", label: "MasterCard" },
        { value: "cashondelivery", label: "Cash On Delivery" },
      ];

      // Loop through the paymentMethods array and create option elements
      paymentMethods.forEach((method) => {
        const option = document.createElement("option");
        option.value = method.value;
        option.text = method.label;
        selectElement.appendChild(option);
      });

      // Payment Total
      const paymentDiv = document.createElement("div");
      paymentDiv.classList.add("payment__div");

      // Retrieve the total price from local storage
      const totalPriceJSON = localStorage.getItem("totalPrice");
      const totalPayment = JSON.parse(totalPriceJSON);

      const totalPrice = document.createElement("p");
      totalPrice.classList.add("checkout__total-price");
      totalPrice.innerHTML = `Total Payment: <span>$${totalPayment}</span>`;

      // Create an input element for card number
      const cardNumberInput = document.createElement("input");
      cardNumberInput.type = "text";
      cardNumberInput.id = "cardNumber";
      cardNumberInput.name = "cardNumber";
      cardNumberInput.placeholder = "Enter 16-digit card number";

      // Create the submit button
      const submitButton = document.createElement("button");
      submitButton.setAttribute("type", "submit");
      submitButton.textContent = "Pay Now";
      submitButton.classList.add("pay__now-btn");

      checkoutContent.appendChild(detailsDiv);
      detailsDiv.appendChild(detailsDivh2);
      detailsDiv.appendChild(detailsDivP);
      checkoutContent.appendChild(formCheckout);
      checkoutContent.appendChild(selectOuterDiv);
      selectOuterDiv.appendChild(selectParagraphElement);
      selectOuterDiv.appendChild(selectElement);
      selectOuterDiv.appendChild(cardNumberInput);
      formCheckout.appendChild(labelCheckout);
      formCheckout.appendChild(inputElement);
      formCheckout.appendChild(divMap);
      formCheckout.appendChild(latInput);
      formCheckout.appendChild(lngInput);
      selectOuterDiv.appendChild(paymentDiv);
      paymentDiv.appendChild(totalPrice);
      paymentDiv.appendChild(submitButton);

      validateCardElement();
    }
  }
}

// Validate Card Element
function validateCardElement() {
  const paymentMethodSelect = document.getElementById("paymentMethod");
  const selectOuterDiv = document.querySelector(".select__outer-div");
  const payNow = document.querySelector(".pay__now-btn");
  const cardNumberInput = document.getElementById("cardNumber");
  const deliveryAddress = document.getElementById("deliveryAddress");

  // Define the formatCardNumber function
  function formatCardNumber(cardNumber) {
    // Remove any non-numeric characters (e.g., spaces and dashes)
    cardNumber = cardNumber.replace(/\D/g, "");

    // Add a space every 4 digits
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");

    return cardNumber;
  }

  // Add an event listener to the select element
  paymentMethodSelect.addEventListener("change", function () {
    const selectedValue = paymentMethodSelect.value;

    if (selectedValue === "visa" || selectedValue === "mastercard") {
      cardNumberInput.style.display = "block";
    } else {
      cardNumberInput.style.display = "none";
    }
  });

  payNow.addEventListener("click", function () {
    const selectedValue = paymentMethodSelect.value;
    const deliveryAddressValue = deliveryAddress.value;

    // Change The Format Card Number
    cardNumberInput.value = formatCardNumber(cardNumberInput.value);

    // Remove spaces before checking the card number length
    const trimmedCardNumber = cardNumberInput.value.replace(/\s/g, "");

    // Validation For DeliveryAddress
    if (deliveryAddressValue === "") {
      deliveryAddress.style.border = "2px solid red";
    } else {
      deliveryAddress.style.border = "2px solid green";
    }

    if (selectedValue === "visa" || selectedValue === "mastercard") {
      // Check for 16 digits for Visa and MasterCard
      if (trimmedCardNumber.length === 16) {
        cardNumberInput.style.border = "2px solid green";
      } else {
        cardNumberInput.style.border = "2px solid red";
      }
    } else {
      // If it's not Visa or MasterCard, don't change the border
      cardNumberInput.style.border = "initial"; // or any other desired style
    }
  });
}

function initMap() {
  const mapElement = document.getElementById("map");

  if (mapElement) {
    const map = new google.maps.Map(mapElement, {
      center: { lat: 4.2105, lng: 101.9758 }, // Set to approximate center of Peninsular Malaysia
      zoom: 5, // Adjust the zoom level as needed to fit your map view
    });

    const input = document.getElementById("deliveryAddress");
    const autocomplete = new google.maps.places.Autocomplete(input);
    const infoWindow = new google.maps.InfoWindow();
    let marker; // Declare the marker variable here to make it accessible in the outer scope

    autocomplete.addListener("place_changed", function () {
      const place = autocomplete.getPlace();

      if (place.geometry && place.geometry.location) {
        // Extract latitude and longitude
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Update the map's center to the entered address
        map.setCenter({ lat, lng });
        map.setZoom(15); // You can adjust the zoom level as needed

        // Create a marker and set its position to the entered address
        marker = new google.maps.Marker({
          map: map,
          position: { lat, lng },
          title: place.name,
        });

        // Add a click event listener to the marker
        marker.addListener("click", function () {
          // Display the address details in an InfoWindow
          infoWindow.setContent(place.formatted_address);
          infoWindow.open(map, marker);
        });

        // Set the marker's position to the entered address
        marker.setPosition({ lat, lng });
      }
    });
  }
}
