

const cards = document.querySelectorAll('.pt');
const contents = {
    'why-heart': document.querySelector('.wellnesstracking'),
    'why-fitness': document.querySelector('.fitnessgoals'),
    'why-weight': document.querySelector('.weightmngmnt'),
    'why-health': document.querySelector('.healthassm')
};

function showDefaultContent() {
    const defaultCard = document.querySelector('#why-heart');
    const defaultContent = contents['why-heart'];

    if (defaultCard && defaultContent) {
        defaultCard.classList.add('active');
        defaultContent.style.display = 'block';
    }
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        Object.values(contents).forEach(content => {
            if (content) content.style.display = 'none';
        });

        cards.forEach(c => c.classList.remove('active'));

        const contentToShow = contents[card.id];
        if (contentToShow) contentToShow.style.display = 'block';
        card.classList.add('active');
    });
});

showDefaultContent();

document.addEventListener("DOMContentLoaded", () => {
    // Select the elements to observe
    const animElements = document.querySelectorAll(".howtocalc, .systemofunits");
  
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running"; // Start the animation
            observer.unobserve(entry.target); // Stop observing the element after animation starts
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
  
    // Apply the observer to each animation element
    animElements.forEach((el) => {
      el.style.animationPlayState = "paused"; // Pause the animation initially
      observer.observe(el);
    });
  });
  
