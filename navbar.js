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

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !center.contains(e.target)) {
            hamburger.classList.remove('active');
            center.classList.remove('active');
        }
    });

    // Close menu when clicking on any navigation link
    const navLinks = document.querySelectorAll('.navbar li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            center.classList.remove('active');
        });
    });
});