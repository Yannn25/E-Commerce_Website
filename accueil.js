$(document).ready(function() {
    var compteIcon = document.querySelector('#compte i');
    var likeIcon = document.querySelector('#like i');
    var panierIcon = document.querySelector('#panier i');
    
    compteIcon.addEventListener('mousseover', function() {
        compteIcon.className = 'bi bi-person-fill';
        compteIcon.onMouseDown = function () {
            compteIcon.className = 'bi bi-person';
        }
    });
    likeIcon.addEventListener('mouseover', function() {
        likeIcon.className = 'bi bi-heart-fill';
        likeIcon.onMouseDown = function () {
            likeIcon.className = 'bi bi-heart';
        }
    });
    panierIcon.addEventListener('mouseover',function() {
        panierIcon.className = 'bi bi-basket3-fill';
        panierIcon.onMouseDown = function () {
            panierIcon.className = 'bi bi-basket3';
        }
    });

    

});