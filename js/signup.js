const firstNameInput = document.getElementById("first__name-input");
const firstNameError = document.getElementById("first__name-error");
const lastNameInput = document.getElementById("last__name-input");
const lastNameError = document.getElementById("last__name-error");
const emailInput = document.getElementById("email__input");
const emailError = document.getElementById("email-error");
const passwordInput = document.getElementById("password__input");
const passwordError = document.getElementById("password-error");
const passwordSimpleError = document.getElementById("password__simple-error");
const verifyPasswordInput = document.getElementById("verify__password-input");
const verifyError = document.getElementById("verify-error");
const signupButton = document.getElementById("signup__button");
const timerElement = document.getElementById("redirect-timer");

let timerInterval; // Declare the timerInterval variable globally

function validateSignup(e) {
  e.preventDefault();

  // Take All The Inputs
  const firstNameValue = firstNameInput.value;
  const lastNameValue = lastNameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const verifyValue = verifyPasswordInput.value;

  // Clear any existing error messages
  firstNameError.classList.remove("show");
  lastNameError.classList.remove("show");
  emailError.classList.remove("show");
  passwordError.classList.remove("show");
  passwordSimpleError.classList.remove("show");
  verifyError.classList.remove("show");

  // Logic Validation
  if (firstNameValue === "") {
    firstNameError.classList.add("show");
  }
  if (lastNameValue === "") {
    lastNameError.classList.add("show");
  }

  if (emailValue === "") {
    emailError.classList.add("show");
  } else if (!isValidEmail(emailValue)) {
    emailError.classList.add("show");
    emailError.textContent = "Invalid email format";
  }

  if (passwordValue === "") {
    passwordError.classList.add("show");
  }

  if (passwordValue.length < 8) {
    passwordSimpleError.classList.add("show");
    passwordSimpleError.textContent = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(passwordValue)) {
    passwordSimpleError.classList.add("show");
    passwordSimpleError.textContent = "One Uppercase Characters Required";
  }

  if (verifyValue === "") {
    verifyError.classList.add("show");
    verifyError.textContent = "Please Verify Your Password";
  } else if (verifyValue !== passwordValue) {
    verifyError.classList.add("show");
    verifyError.textContent = "Password Do Not Match";
  }

  if (
    firstNameError.textContent !== "" &&
    lastNameError.textContent !== "" &&
    emailError.textContent !== "" &&
    passwordError.textContent !== "" &&
    passwordSimpleError.textContent !== "" &&
    verifyError.textContent !== ""
  ) {
    // Form is valid, you can submit the form or take other actions here
    // For example, you can reset the form and start the redirection timer.
    timerElement.classList.add("show");
    startRedirectionTimer("../login.html", 5);
    resetForm();
  }
}

signupButton.addEventListener("click", validateSignup);

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function resetForm() {
  // Clear all input fields
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  verifyPasswordInput.value = "";
}

function startRedirectionTimer(url, delayInSeconds) {
  let secondsRemaining = delayInSeconds;

  function updateTimer() {
    timerElement.textContent = `Signup Successful, Redirecting to login page in ${secondsRemaining} seconds.`;
    secondsRemaining--;

    if (secondsRemaining < 0) {
      clearInterval(timerInterval); // Clear the interval
      window.location.href = url; // Redirect to the login page
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);

  // Clear the interval when navigating away from the page (optional)
  window.addEventListener("beforeunload", function () {
    clearInterval(timerInterval);
  });
}
