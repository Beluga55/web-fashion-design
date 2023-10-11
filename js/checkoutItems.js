const checkoutContainer = document.querySelector(".checkout__content > div");

function displaySelectedItems() {
  // Get the checked items from local storage
  const checkedDataJSON = localStorage.getItem("selectedItems");

  // Retrieve the total price from local storage
  const totalPrice = parseFloat(localStorage.getItem("totalPrice"));

  if (checkedDataJSON) {
    const checkedItems = JSON.parse(checkedDataJSON);

    // Clear the existing content of checkoutContainer
    checkoutContainer.innerHTML = "";

    // Loop through the checkedData from selectedItems local storage
    checkedItems.forEach((item, index) => {
      const checkedDivElement = document.createElement("div");
      checkedDivElement.classList.add("checked__item");

      // Create The HTML structure
      const newCheckedItems = `
            <div>
                <img src="${item.image}" alt="${item.name}" />
            </div>
        `;

      checkedDivElement.innerHTML = newCheckedItems;
      checkoutContainer.appendChild(checkedDivElement);
    });
  }
}

// Call the function to display cart items when the page loads
displaySelectedItems();
