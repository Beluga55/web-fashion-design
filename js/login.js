// Login
const loginEmailError = document.querySelector(".email-error");
const loginPasswordError = document.querySelector(".password-error");
const loginButton = document.querySelector(".login-submit");
const loginInput = document.getElementById("email-login");
const loginPasswordInput = document.getElementById("password-login");
const loginOverlay = document.querySelector(".login__overlay");
const loginButtonRedirect = document.getElementById("login-button");

function validateLogin(e) {
  e.preventDefault();

  // Get the values from the input fields
  const emailLoginValue = loginInput.value;
  const passwordLoginValue = loginPasswordInput.value;

  // Clear any existing error messages
  loginEmailError.classList.remove("show");
  loginPasswordError.classList.remove("show");

  if (emailLoginValue === "") {
    loginEmailError.classList.add("show");
  } else if (passwordLoginValue === "") {
    loginPasswordError.classList.add("show");
  } else {
    // Clear the input fields
    loginInput.value = "";
    loginPasswordInput.value = "";
    loginOverlay.classList.add("show");
  }
}
loginButton.addEventListener("click", validateLogin);

function redirectProduct() {
  loginOverlay.classList.remove("show");
  window.location.href = "../products.html";
}

loginButtonRedirect.addEventListener("click", redirectProduct);
