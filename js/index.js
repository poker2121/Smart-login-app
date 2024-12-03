
let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");
let inCorrect = document.getElementById("incorrect");
let successMessage = document.getElementById("successMessage");
//^===========================================================

function login() {
  resetMessages();

  let signinEmailValue = signinEmail.value.trim();
  let signinPasswordValue = signinPassword.value.trim();

  resetValidationClasses();


  let isEmailValid = validateEmail(signinEmailValue);
  let isPasswordValid = validatePassword(signinPasswordValue);


  let storedUser = getUserFromStorage(signinEmailValue);
  let isEmailFound = !!storedUser;
  let isPasswordCorrect = storedUser?.password === signinPasswordValue;

  applyValidation(signinEmail, isEmailValid && isEmailFound);
  applyValidation(signinPassword, isPasswordValid && isPasswordCorrect);

  if (!isEmailFound || !isPasswordCorrect) {
    displayError("Invalid email or password");
    return;
  }

  displaySuccess("Login successful! Redirecting...");
  setTimeout(() => {
    window.location.href = "./home.html";
  }, 2000);
}

function resetMessages() {
  inCorrect.style.display = "none";
  successMessage.style.display = "none";
}

function resetValidationClasses() {
  signinEmail.classList.remove("is-valid", "is-invalid");
  signinPassword.classList.remove("is-valid", "is-invalid");
}

function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.length >= 5 && emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function getUserFromStorage(email) {
  return JSON.parse(localStorage.getItem(email));
}

function applyValidation(element, isValid) {
  element.classList.add(isValid ? "is-valid" : "is-invalid");
}

function displayError(message) {
  inCorrect.textContent = message;
  inCorrect.style.display = "block";
}

function displaySuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = "block";
}
