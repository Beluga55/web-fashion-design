// Refactored
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

  const nameValue = newsletterName.value;
  const emailValue = newsletterEmail.value;

  clearErrorMessages();

  if (nameValue === "") {
    nameError.classList.add("show");
  } else if (emailValue === "") {
    emailError.classList.add("show");
  } else {
    clearInputFields();
    overlayShow.classList.add("show");
  }
}

function clearErrorMessages() {
  nameError.classList.remove("show");
  emailError.classList.remove("show");
}

function clearInputFields() {
  newsletterName.value = "";
  newsletterEmail.value = "";
  textArea.value = "";
}

newsletterButton.addEventListener("click", validateNewsletter);

mainPageButton.addEventListener("click", () => {
  overlayShow.classList.remove("show");
  window.location.href = "index.html";
});