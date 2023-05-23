
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
