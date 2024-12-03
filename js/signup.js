
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var inCorrect = document.getElementById("incorrect");
var successMessage = document.getElementById("successMessage");

//^==================================================================================
//* Signup Process
function signup() {
  const userNameValue = userName.value.trim();
  const signupEmailValue = signupEmail.value.trim();
  const signupPasswordValue = signupPassword.value.trim();

  // Reset messages and styles
  resetMessages();

  // Validate inputs
  const isUserNameValid = validateUserName(userNameValue);
  const isEmailValid = validateEmail(signupEmailValue);
  const isPasswordValid = validatePassword(signupPasswordValue);

  // If any validation fails, show an error message
  if (!isUserNameValid || !isEmailValid || !isPasswordValid) {
    displayError("Please fill all fields correctly.");
    return;
  }

  // Check if the email already exists
  if (localStorage.getItem(signupEmailValue)) {
    displayError("This email is already registered. Try logging in.");
    signupEmail.classList.add("is-invalid");
    return;
  }

  // Save the user data to localStorage
  saveUser(userNameValue, signupEmailValue, signupPasswordValue);

  // Display success message and redirect
  displaySuccess("Account created successfully! Redirecting...");
  resetForm();

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 3000);
}

function resetMessages() {
  inCorrect.textContent = "";
  successMessage.textContent = "";
  successMessage.style.display = "none";
  inCorrect.style.display = "none";
  userName.classList.remove("is-valid", "is-invalid");
  signupEmail.classList.remove("is-valid", "is-invalid");
  signupPassword.classList.remove("is-valid", "is-invalid");
}

function validateUserName(name) {
  const isValid = !!name;
  userName.classList.add(isValid ? "is-valid" : "is-invalid");
  return isValid;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  signupEmail.classList.add(isValid ? "is-valid" : "is-invalid");
  return isValid;
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
  const isValid = passwordRegex.test(password);
  signupPassword.classList.add(isValid ? "is-valid" : "is-invalid");
  return isValid;
}

function saveUser(name, email, password) {
  const user = { name, email, password };
  localStorage.setItem(email, JSON.stringify(user));
  localStorage.setItem("currentUser", name);
}

function displayError(message) {
  inCorrect.textContent = message;
  inCorrect.style.display = "block";
}

function displaySuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = "block";
}

function resetForm() {

  userName.classList.remove("is-valid", "is-invalid");
  signupEmail.classList.remove("is-valid", "is-invalid");
  signupPassword.classList.remove("is-valid", "is-invalid");
}
