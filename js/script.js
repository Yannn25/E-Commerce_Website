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


    var btn = document.querySelector('#switch');
    btn.addEventListener('click', function() {
      if (btn.value === 'commandes') {
        // Envoie de la requête POST pour afficher les commandes
        $.post('/gerant/commandes', function(data) {
          $('body').html(data);
        });
      } 
      if (btn.value === 'stocks') {
        $.post('/gerant/stocks', function(data) {
            $('body').html(data);
          });
        }
    });
