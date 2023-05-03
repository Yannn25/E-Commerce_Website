$(document).ready(function() {
    var compteIcon = document.querySelector('#compte i');
    var likeIcon = document.querySelector('#like i');
    var panierIcon = document.querySelector('#panier i');

    var ConnectButton = document.getElementById("SwitchtoConnexion");
    var HomeButton = document.getElementById("SwitchtoHome");
    var ContactButton = document.getElementById("SwitchtoContact");

    var section1 = document.getElementById("accueil");
    var section2 = document.getElementById("connect");
    var section3 = document.getElementById("jsp");

    compteIcon.addEventListener('mouseover', function() {
        compteIcon.className = 'bi bi-person-fill';
    });
    compteIcon.addEventListener('mouseout', function() {
        compteIcon.className = 'bi bi-person';
    });
    likeIcon.addEventListener('mouseover', function() {
        likeIcon.className = 'bi bi-heart-fill';
    });
    likeIcon.addEventListener('mouseout', function() {
        likeIcon.className = 'bi bi-heart';
    });
    panierIcon.addEventListener('mouseover',function() {
        panierIcon.className = 'bi bi-basket3-fill';
    });
    panierIcon.addEventListener('mouseout', function() {
        panierIcon.className = 'bi bi-basket3';
    });
    
    ConnectButton.addEventListener("click", function() {
        if (section2.style.display === "none") {
        section2.style.display = "block";
        section1.style.display = "none";
        section3.style.display = "none";
        }
    });
    HomeButton.addEventListener("click", function() {
        if (section1.style.display === "none") {
        section1.style.display = "flex";
        section3.style.display = "flex";
        section2.style.display = "none";
        }
    });
    ContactButton.addEventListener("click", function() {
        if (section1.style.display === "none") {
        section1.style.display = "flex";
        section2.style.display = "none";
        }
    });

    

});
