var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var userName = document.getElementById("userName"); // تأكد من أن العنصر موجود في HTML
var inCorrect = document.getElementById("incorrect");
var successMessage = document.getElementById("successMessage");

//^==================================================================================
//* Signup Process
function signup() {
  let userNameValue = userName.value.trim();
  let signupEmailValue = signupEmail.value.trim();
  let signupPasswordValue = signupPassword.value.trim();

  // Reset messages and styles
  resetMessages();

  // Validate inputs
  let isUserNameValid = validateUserName(userNameValue);
  let isEmailValid = validateEmail(signupEmailValue);
  let isPasswordValid = validatePassword(signupPasswordValue);

  // If any validation fails, show an error message
  if (!isUserNameValid || !isEmailValid || !isPasswordValid) {
    displayError("Please fill all fields correctly.");
    return;
  }

  // Check if the email already exists
  if (localStorage.getItem(signupEmailValue)) {
    displayError("This email is already registered.");
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

// Real-time validation on each field
userName.addEventListener("input", () =>
  validateUserName(userName.value.trim())
);
signupEmail.addEventListener("input", () =>
  validateEmail(signupEmail.value.trim())
);
signupPassword.addEventListener("input", () =>
  validatePassword(signupPassword.value.trim())
);

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
  let isValid = !!name;
  if (name === "") {
    userName.classList.remove("is-valid", "is-invalid");
  } else {
    userName.classList.add(isValid ? "is-valid" : "is-invalid");
  }
  return isValid;
}

function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = emailRegex.test(email);

  let signupEmail = document.getElementById("signupEmail");

  if (email === "") {
    signupEmail.classList.remove("is-valid", "is-invalid");
  } else if (isValid) {
    signupEmail.classList.remove("is-invalid");
    signupEmail.classList.add("is-valid");
  } else {
    signupEmail.classList.remove("is-valid");
    signupEmail.classList.add("is-invalid");
  }

  return isValid;
}

function validatePassword(password) {
  let passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  let isValid = passwordRegex.test(password);
  let signupPassword = document.getElementById("signupPassword");
  if (password === "") {
    signupPassword.classList.remove("is-valid", "is-invalid");
  } else if (isValid) {
    signupPassword.classList.remove("is-invalid");
    signupPassword.classList.add("is-valid");
  } else {
    signupPassword.classList.remove("is-valid");
    signupPassword.classList.add("is-invalid");
  }
  return isValid;
}

function saveUser(name, email, password) {
  let user = { name, email, password };
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
