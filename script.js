

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

  
