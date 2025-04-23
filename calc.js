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

    let heightInMeters = 0;

    if (!heightFtIn.classList.contains('hidden')) {
        heightInMeters = ((ft * 12) + inches) * 0.0254;
    } else if (!heightCm.classList.contains('hidden')) {
        heightInMeters = cm / 100;
    }

    if (heightInMeters > 0 && weight > 0) {
        const bmi = weight / (heightInMeters * heightInMeters);
        updateBMIBar(bmi.toFixed(1));
    } else {
        alert('Please enter valid height and weight values.');
    }
});

// Update BMI bar based on BMI value
function updateBMIBar(bmi) {
    const bmiIndicator = document.getElementById('bmi-indicator');
    const bmiResult = document.getElementById('bmi-result');
    const bmiBar = document.querySelector('.bmi-bar'); // Get the bar to calculate its width
    const barWidth = bmiBar.offsetWidth; // Dynamically calculate bar width
    const bmiRanges = {
        underweight: 18.5,
        healthy: 24.9,
        overweight: 29.9,
        obese: 40
    };
}