$(document).ready(function() {
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
  });