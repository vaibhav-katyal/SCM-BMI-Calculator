// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the hamburger menu and navigation elements
    const hamburger = document.querySelector('.hamburger');
    const center = document.querySelector('.center');
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        center.classList.toggle('active');
    });
})