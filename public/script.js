/**
 * transition 3 barres croix pour la navbar
 */
const tg = document.querySelector(".hmg")
const navlinksContainer = document.querySelector(".navlinks-container")
const tgNav = e =>{
	tg.classList.toggle("open")
	navlinksContainer.classList.toggle("open")
	const ariaTg = tg.getAttribute("aria-expanded") === "true"?"false" : "true"
	tg.setAttribute("aria-expanded",ariaTg)
}
tg.addEventListener("click",tgNav)

/**
 * pour que ce soit plus propre quand on resize
 */

new ResizeObserver(entries => {
	if (entries[0].contentRect.width <= 900) {
		navlinksContainer.style.transition = "transform 0.3s ease-out"
	}else{
		navlinksContainer.style.transition = "none"
	}
	
}).observe(document.body)
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
