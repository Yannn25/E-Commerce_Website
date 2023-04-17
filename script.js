function updateFooterPosition() {
    const footer = document.querySelector('.footer');
    if (window.innerHeight > footer.offsetTop + footer.offsetHeight) {
      footer.style.position = 'fixed';
      footer.style.bottom = '0';
    } else {
      footer.style.position = 'static';
    }
  }
  
  // Mettre à jour la position du footer au chargement de la page
  window.addEventListener('load', updateFooterPosition);
  
  // Mettre à jour la position du footer lorsque la taille de la fenêtre change
  window.addEventListener('resize', updateFooterPosition);