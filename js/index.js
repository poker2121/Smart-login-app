
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var inCorrect = document.getElementById("incorrect");
var successMessage = document.getElementById("successMessage");
var logoutBtn = document.getElementById("logoutBtn");

//* login Process
function login() {
  inCorrect.style.display = "none"; 
  successMessage.style.display = "none"; 

  var signinEmailValue = signinEmail.value.trim();
  var signinPasswordValue = signinPassword.value.trim();

 
  if (!signinEmailValue || !signinPasswordValue) {
    inCorrect.textContent = "All fields are required";
    inCorrect.style.display = "block"; 
    return;
  }

 
  if (signinEmailValue.length < 5 || signinPasswordValue.length < 5) {
    inCorrect.textContent = "Email and Password must be at least 5 characters long.";
    inCorrect.style.display = "block"; 
    return;
  }

  
  var storedUser = JSON.parse(localStorage.getItem(signinEmailValue));

  if (storedUser && storedUser.password === signinPasswordValue) {
    successMessage.textContent = "Login successful! Redirecting...";
    successMessage.style.display = "block"; 
    inCorrect.style.display = "none"; 
    setTimeout(() => window.location.href = "./home.html", 2000);
  } else {
    inCorrect.textContent = "Invalid email or password";
    inCorrect.style.display = "block"; 
    successMessage.style.display = "none"; 
  }
}
//* Signup Process
function signup() {
  var userNameValue = userName.value.trim();
  var signupEmailValue = signupEmail.value.trim();
  var signupPasswordValue = signupPassword.value.trim();

  inCorrect.textContent = ""; 
  successMessage.textContent = ""; 
  successMessage.style.display = "none"; 
  inCorrect.style.display = "none"; 

  // Check if all fields are filled
  if (!signupEmailValue || !signupPasswordValue || !userNameValue) {
    inCorrect.textContent = "All fields are required";
    inCorrect.style.display = "block"; 
    return;
  }

  // Email validation regex
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(signupEmailValue)) {
    inCorrect.textContent = "Please enter a valid email address";
    inCorrect.style.display = "block";
    return;
  }


  if (localStorage.getItem(signupEmailValue)) {
    inCorrect.textContent = "Email already exists";
    inCorrect.style.display = "block"; 
    return;
  }

  var user = {
    name: userNameValue,
    email: signupEmailValue,
    password: signupPasswordValue,
  };

  localStorage.setItem(signupEmailValue, JSON.stringify(user));

  // Store the current user
  localStorage.setItem("currentUser", userNameValue);


  successMessage.textContent = "Account created successfully! Redirecting...";
  successMessage.style.display = "block";

  userName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 3000);
}





document.addEventListener("DOMContentLoaded", function () {

  var usernameSpan = document.getElementById("username");
  var currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    usernameSpan.textContent = `, ${currentUser}`;
  } else {
    usernameSpan.textContent = ", Guest";
  }


  var logoutButtons = document.querySelectorAll("#logoutBtn, #logoutBtnLg");
  logoutButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      localStorage.removeItem("currentUser"); 
      window.location.href = "./index.html";  
    });
  });
});
