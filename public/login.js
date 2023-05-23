const signUp =  document.querySelector('.t-signup');
const logIn = document.querySelector('.t-login');
const addclass = document.querySelector('.site')

signUp.addEventListener('click',function () {
  addclass.className = 'site signup-show'
})
logIn.addEventListener('click',function () {
  addclass.className = 'site login-show'
})

