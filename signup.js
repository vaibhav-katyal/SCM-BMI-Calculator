document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('sign');
    const signUpPopup = document.getElementById('signUpPopup');
    const closeButton = signUpPopup.querySelector('.close');
    const signUpForm = document.getElementById('signUpForm');

    signUpButton.addEventListener('click', function() {
        signUpPopup.style.display = 'block';
      });

    closeButton.addEventListener('click', function() {
    signUpPopup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === signUpPopup) {
          signUpPopup.style.display = 'none';
        }
      });  

    signUpForm.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Sign up successful!');
    signUpPopup.style.display = 'none';
    });
  
});