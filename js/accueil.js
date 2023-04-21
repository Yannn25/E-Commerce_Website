$(document).ready(function() {
    var compteIcon = document.querySelector('#compte i');
    var likeIcon = document.querySelector('#like i');
    var panierIcon = document.querySelector('#panier i');

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
});
