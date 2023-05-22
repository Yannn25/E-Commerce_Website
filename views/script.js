/* Changement entre es sections */
var ConnectButton = document.getElementById("SwitchtoConnexion");
var HomeButton = document.getElementById("SwitchtoHome");
var ContactButton = document.getElementById("SwitchtoContact");

var section1 = document.getElementById("accueil");
var section2 = document.getElementById("connect");
var section3 = document.getElementById("articles");
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
    section3.style.display = "flex";
    section2.style.display = "none";
  }
});
/* Images qui tournent accueil */

const carousel = document.querySelector('.carousel-container');
const slides = carousel.querySelectorAll('.carousel-slide');
const intervalTime = 5000; // 10 seconds
let slideInterval;

// Set the initial slide to the first one
let currentSlide = 0;

// Make the first slide visible
slides[currentSlide].classList.add('active');

// Function to start the slide interval
function startSlideInterval() {
  slideInterval = setInterval(() => {
    // Remove the active class from the current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to the next slide
    currentSlide++;
    
    // If we've reached the end of the slides, start over
    if (currentSlide === slides.length) {
      currentSlide = 0;
    }
    
    // Make the next slide visible
    slides[currentSlide].classList.add('active');
  }, intervalTime);
}

// Function to stop the slide interval
function stopSlideInterval() {
  clearInterval(slideInterval);
}

// Start the slide interval
startSlideInterval();

/**
 * changement connexion inscription
 */
const signUp =  document.querySelector('.t-signup');
const logIn = document.querySelector('.t-login');
const addclass = document.querySelector('.site')

signUp.addEventListener('click',function () {
  addclass.className = 'site signup-show'
})
logIn.addEventListener('click',function () {
  addclass.className = 'site login-show'
})