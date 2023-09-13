/*=============== NEWSLETTER VALIDATION, LOGIN, AND SIGNUP =============== */
const newsletterButton = document.getElementById("submit");
const newsletterName = document.getElementById("name");
const newsletterEmail = document.getElementById("email");
const textArea = document.getElementById("textarea");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const overlayShow = document.querySelector(".newsletter__success-overlay");
const mainPageButton = document.getElementById("main-page");

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
    textArea.value = "";
    overlayShow.classList.add("show");
  }
}

newsletterButton.addEventListener("click", validateNewsletter);

function backMainMenu() {
  overlayShow.classList.remove("show");
  window.location.href = "index.html";
}

mainPageButton.addEventListener("click", backMainMenu);