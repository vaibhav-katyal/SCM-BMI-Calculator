const switchToCmButton = document.getElementById('switch-to-cm');
const heightFtIn = document.getElementById('height-ft-in');
const heightCm = document.getElementById('height-cm');

switchToCmButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    if (heightFtIn.classList.contains('hidden')) {
        heightFtIn.classList.remove('hidden');
        heightCm.classList.add('hidden');
        switchToCmButton.textContent = 'Switch to cm';
    } else {
        heightFtIn.classList.add('hidden');
        heightCm.classList.remove('hidden');
        switchToCmButton.textContent = 'Switch to ft/in';
    }
});

document.getElementById('calc_but').addEventListener('click', () => {
    const ft = parseFloat(document.getElementById('ft').value) || 0;
    const inches = parseFloat(document.getElementById('in').value) || 0;
    const cm = parseFloat(document.getElementById('cm').value) || 0;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
})