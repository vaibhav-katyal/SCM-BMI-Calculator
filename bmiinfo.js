const overweightSection = document.querySelector('.overweight');
const underweightSection = document.querySelector('.underweight');

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
};
