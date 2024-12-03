document.addEventListener("DOMContentLoaded", function () {
  let usernameSpan = document.getElementById("username");
  let currentUser = localStorage.getItem("currentUser");
  let logoutButtons = document.querySelectorAll("#logoutBtn, #logoutBtnLg");

 
  usernameSpan.textContent = currentUser ? `, ${currentUser}` : ", Guest";

 
  logoutButtons.forEach((button) => {
    button.addEventListener("click", handleLogout);
  });
});

function handleLogout() {

  if (confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("currentUser");
    window.location.href = "./index.html";
  }
}
