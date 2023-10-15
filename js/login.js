// Refactored
const loginEmailError = document.querySelector(".email-error");
const loginPasswordError = document.querySelector(".password-error");
const loginButton = document.querySelector(".login-submit");
const loginInput = document.getElementById("email-login");
const loginPasswordInput = document.getElementById("password-login");
const loginOverlay = document.querySelector(".login__overlay");
const loginButtonRedirect = document.getElementById("login-button");

function validateLogin(e) {
  e.preventDefault();

  const emailLoginValue = loginInput.value;
  const passwordLoginValue = loginPasswordInput.value;

  clearErrorMessages();

  if (emailLoginValue === "") {
    loginEmailError.classList.add("show");
  } else if (passwordLoginValue === "") {
    loginPasswordError.classList.add("show");
  } else {
    clearInputFields();
    loginOverlay.classList.add("show");
  }
}

function clearErrorMessages() {
  loginEmailError.classList.remove("show");
  loginPasswordError.classList.remove("show");
}

function clearInputFields() {
  loginInput.value = "";
  loginPasswordInput.value = "";
}

function redirectProduct() {
  loginOverlay.classList.remove("show");
  window.location.href = "../products.html";
}

loginButton.addEventListener("click", validateLogin);
loginButtonRedirect.addEventListener("click", redirectProduct);
