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

document.getElementById("calc_but").addEventListener("click", () => {
    const ft = Number.parseFloat(document.getElementById("ft").value) || 0
    const inches = Number.parseFloat(document.getElementById("in").value) || 0
    const cm = Number.parseFloat(document.getElementById("cm").value) || 0
    const weight = Number.parseFloat(document.getElementById("weight").value) || 0
    const age = Number.parseFloat(document.getElementById("age").value) || 0
    const isMale = document.getElementById("male").checked
  
    let heightInMeters = 0
  
    if (!heightFtIn.classList.contains("hidden")) {
      heightInMeters = (ft * 12 + inches) * 0.0254
    } else if (!heightCm.classList.contains("hidden")) {
      heightInMeters = cm / 100
    }
  
    if (heightInMeters > 0 && weight > 0 && age > 0) {
      const bmi = weight / (heightInMeters * heightInMeters)
      updateBMIBar(bmi.toFixed(1))
      showBMIResult(bmi.toFixed(1), isMale, age)
    } else {
      showError("Please enter valid height, weight, and age values.")
    }
  })
  // Show error message
function showError(message) {
    const errorPopup = document.getElementById("error-popup")
    const errorMessage = document.getElementById("error-message")
  
    errorMessage.textContent = message
    errorPopup.classList.add("show")
  
    setTimeout(() => {
      errorPopup.classList.remove("show")
    }, 3000)
  }
  

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

    // Normalize BMI to bar width (range: 10–40)
    const normalizedBMI = Math.max(10, Math.min(40, bmi)); // Clamp BMI between 10 and 40
    const position = ((normalizedBMI - 10) / (40 - 10)) * barWidth; // Map BMI to bar width
    bmiIndicator.style.left = `${position}px`;

    // Determine category and update text
    let category = '';
    if (bmi < bmiRanges.underweight) {
        category = 'Underweight';
    } else if (bmi <= bmiRanges.healthy) {
        category = 'Healthy';
    } else if (bmi <= bmiRanges.overweight) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    bmiResult.textContent = `Your BMI: ${bmi} (${category})`;
}
