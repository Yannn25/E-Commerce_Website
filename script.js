var ConnectButton = document.getElementById("SwitchtoConnexion");
var HomeButton = document.getElementById("SwitchtoHome");
var ContactButton = document.getElementById("SwitchtoContact");

var section1 = document.getElementById("accueil");
var section2 = document.getElementById("connect");

ConnectButton.addEventListener("click", function() {
  if (section2.style.display === "none") {
    section2.style.display = "flex";
    section1.style.display = "none";
  }
});
HomeButton.addEventListener("click", function() {
  if (section1.style.display === "none") {
    section1.style.display = "flex";
    section2.style.display = "none";
  }
});
ContactButton.addEventListener("click", function() {
  if (section1.style.display === "none") {
    section1.style.display = "flex";
    section2.style.display = "none";
  }
});
