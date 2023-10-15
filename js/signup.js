// Refactored Code For Signup (Last Version)
function getElementById(id) {
  return document.getElementById(id);
}

const elements = {
  firstNameInput: getElementById("first__name-input"),
  firstNameError: getElementById("first__name-error"),
  lastNameInput: getElementById("last__name-input"),
  lastNameError: getElementById("last__name-error"),
  emailInput: getElementById("email__input"),
  emailError: getElementById("email-error"),
  passwordInput: getElementById("password__input"),
  passwordError: getElementById("password-error"),
  passwordSimpleError: getElementById("password__simple-error"),
  verifyPasswordInput: getElementById("verify__password-input"),
  verifyError: getElementById("verify-error"),
  signupButton: getElementById("signup__button"),
  timerElement: getElementById("redirect-timer"),
};

const errorElements = [
  elements.firstNameError,
  elements.lastNameError,
  elements.emailError,
  elements.passwordError,
  elements.passwordSimpleError,
  elements.verifyError,
];

function clearErrorMessages() {
  errorElements.forEach((element) => element.classList.remove("show"));
}

function validateSignup(e) {
  e.preventDefault();

  const {
    firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    verifyPasswordInput,
  } = elements;

  clearErrorMessages();

  const firstNameValue = firstNameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const verifyValue = verifyPasswordInput.value.trim();

  if (firstNameValue === "") {
    elements.firstNameError.classList.add("show");
  }

  if (lastNameValue === "") {
    elements.lastNameError.classList.add("show");
  }

  if (emailValue === "") {
    elements.emailError.classList.add("show");
    elements.emailError.textContent = "Email is required";
  } else if (!isValidEmail(emailValue)) {
    elements.emailError.classList.add("show");
    elements.emailError.textContent = "Invalid email format";
  }

  if (passwordValue === "") {
    elements.passwordError.classList.add("show");
  } else if (passwordValue.length < 8 || !/[A-Z]/.test(passwordValue)) {
    elements.passwordSimpleError.classList.add("show");
    elements.passwordSimpleError.textContent =
      passwordValue.length < 8
        ? "Password must be at least 8 characters"
        : "One Uppercase Character Required";
  }

  if (verifyValue === "") {
    elements.verifyError.classList.add("show");
    elements.verifyError.textContent = "Please Verify Your Password";
  } else if (verifyValue !== passwordValue) {
    elements.verifyError.classList.add("show");
    elements.verifyError.textContent = "Passwords Do Not Match";
  }

  if (errorElements.every((element) => !element.classList.contains("show"))) {
    resetForm();
    elements.timerElement.classList.add("show");
    startRedirectionTimer("login.html", 5);
  } else {
    elements.timerElement.classList.remove("show");
  }
}

elements.signupButton.addEventListener("click", validateSignup);

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function resetForm() {
  elements.firstNameInput.value = "";
  elements.lastNameInput.value = "";
  elements.emailInput.value = "";
  elements.passwordInput.value = "";
  elements.verifyPasswordInput.value = "";
}

function startRedirectionTimer(url, delayInSeconds) {
  let secondsRemaining = delayInSeconds;

  function updateTimer() {
    elements.timerElement.textContent = `Signup Successful, Redirecting to login page in ${secondsRemaining} seconds.`;
    secondsRemaining--;

    if (secondsRemaining < 0) {
      clearInterval(timerInterval);
      window.location.href = url;
    }
  }

  updateTimer();
  let timerInterval = setInterval(updateTimer, 1000);

  window.addEventListener("beforeunload", function () {
    clearInterval(timerInterval);
  });
}