const container = document.getElementById('container');
const signUpButton = document.getElementById('signUp');
const logInButton = document.getElementById('logIn');

signUpButton.addEventListener('click', ()=>{
    container.classList.add('panel-active')
})

logInButton.addEventListener('click', ()=>{
    container.classList.remove('panel-active')
})