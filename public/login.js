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


/* si on clique sur envoyer mais qu'il y une erreur/champ manquant on envoie le warning */
const form = document.getElementById('connect').addEventListener('submit', function(event) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('error-message');
    
    if (!nameInput.value || !emailInput.value) {
      errorMessage.style.display = 'block';
      event.preventDefault(); // Empêche la soumission du formulaire
    } else {
      errorMessage.style.display = 'none';
      
    }
  });

/*transitions */
const body = document.querySelector('body')
const signInBtn = document.querySelector('.signinBtn')
const signUpBtn = document.querySelector('.signupBtn')
const formBx = document.querySelector('.formBx')

signUpBtn.onclick = function(){
	formBx.classList.add('active')
	body.classList.add('active')
}
signInBtn.onclick = function(){
	formBx.classList.remove('active')
	body.classList.remove('active')
}