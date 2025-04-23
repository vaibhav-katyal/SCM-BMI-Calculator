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

const observerOptions = {
    root: null,
    threshold: 0.1
};
const observer = new IntersectionObserver(animateOnScroll, observerOptions);

observer.observe(overweightSection);
observer.observe(underweightSection);
document.styleSheets[0].insertRule(`
    .overweight.animate {
        animation: overweight-anim 2s ease forwards;
    }
`, document.styleSheets[0].cssRules.length);

document.styleSheets[0].insertRule(`
    .underweight.animate {
        animation: underweight-anim 2s ease forwards;
    }
`, document.styleSheets[0].cssRules.length);