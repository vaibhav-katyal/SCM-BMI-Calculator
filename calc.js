const switchToCmButton = document.getElementById("switch-to-cm")
const heightFtIn = document.getElementById("height-ft-in")
const heightCm = document.getElementById("height-cm")

switchToCmButton.addEventListener("click", (event) => {
  event.preventDefault()
  if (heightFtIn.classList.contains("hidden")) {
    heightFtIn.classList.remove("hidden")
    heightCm.classList.add("hidden")
    switchToCmButton.textContent = "Switch to cm"
  } else {
    heightFtIn.classList.add("hidden")
    heightCm.classList.remove("hidden")
    switchToCmButton.textContent = "Switch to ft/in"
  }
})

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
  const bmiIndicator = document.getElementById("bmi-indicator")
  const bmiResult = document.getElementById("bmi-result")
  const bmiBar = document.querySelector(".bmi-bar") // Get the bar to calculate its width
  const barWidth = bmiBar.offsetWidth // Dynamically calculate bar width
  const bmiRanges = {
    underweight: 18.5,
    healthy: 24.9,
    overweight: 29.9,
    obese: 40,
  }

  // Normalize BMI to bar width (range: 10–40)
  const normalizedBMI = Math.max(10, Math.min(40, bmi)) // Clamp BMI between 10 and 40
  const position = ((normalizedBMI - 10) / (40 - 10)) * barWidth // Map BMI to bar width
  bmiIndicator.style.left = `${position}px`

  // Determine category and update text
  let category = ""
  if (bmi < bmiRanges.underweight) {
    category = "Underweight"
  } else if (bmi <= bmiRanges.healthy) {
    category = "Healthy"
  } else if (bmi <= bmiRanges.overweight) {
    category = "Overweight"
  } else {
    category = "Obese"
  }

  bmiResult.innerHTML = `<p>Your BMI: ${bmi} <span class="category-${category.toLowerCase()}">(${category})</span></p>`
}

// Show BMI result with animation and precautions
function showBMIResult(bmi, isMale, age) {
  const resultPopup = document.getElementById("bmi-result-popup")
  const resultValue = document.getElementById("result-value")
  const resultCategory = document.getElementById("result-category")
  const resultPrecautions = document.getElementById("result-precautions")
  const resultImage = document.getElementById("result-image")
  const resultClose = document.getElementById("result-close")

  // Determine BMI category
  let category = ""
  let precautions = ""
  let imageUrl = ""

  if (bmi < 18.5) {
    category = "Underweight"
    precautions = `
            <ul>
                <li>Increase calorie intake with nutrient-dense foods</li>
                <li>Add protein-rich foods to your diet (eggs, nuts, lean meats)</li>
                <li>Eat smaller meals more frequently throughout the day</li>
                <li>Consider strength training to build muscle mass</li>
                <li>Consult with a healthcare provider about potential underlying conditions</li>
            </ul>
        `
    imageUrl = "other images/underweight.png"
  } else if (bmi <= 24.9) {
    category = "Healthy"
    precautions = `
            <ul>
                <li>Maintain a balanced diet with plenty of fruits and vegetables</li>
                <li>Stay physically active with at least 150 minutes of moderate exercise weekly</li>
                <li>Get regular health check-ups</li>
                <li>Maintain good sleep habits (7-9 hours per night)</li>
                <li>Manage stress through relaxation techniques</li>
            </ul>
        `
    imageUrl = "other images/healthy.png"
  } else if (bmi <= 29.9) {
    category = "Overweight"
    precautions = `
            <ul>
                <li>Reduce calorie intake moderately (300-500 calories less per day)</li>
                <li>Increase physical activity to at least 30 minutes daily</li>
                <li>Focus on whole foods and reduce processed food consumption</li>
                <li>Monitor portion sizes during meals</li>
                <li>Stay hydrated and limit sugary beverages</li>
            </ul>
        `
    imageUrl = "other images/overweight.png"
  } else {
    category = "Obese"
    precautions = `
            <ul>
                <li>Consult with a healthcare provider for a personalized weight management plan</li>
                <li>Consider working with a registered dietitian</li>
                <li>Start with low-impact exercises like walking or swimming</li>
                <li>Set realistic weight loss goals (1-2 pounds per week)</li>
                <li>Monitor for related health conditions like high blood pressure or diabetes</li>
            </ul>
        `
    imageUrl = "other images/obese.png"
  }

  // Add age-specific advice
  if (age < 18) {
    precautions += `
            <p class="age-specific">
                <strong>Note for teens:</strong> BMI calculations for people under 18 should be interpreted differently. 
                Please consult with a pediatrician for proper growth assessment.
            </p>
        `
  } else if (age > 65) {
    precautions += `
            <p class="age-specific">
                <strong>Note for seniors:</strong> BMI ranges may be interpreted slightly differently for older adults.
                Focus on maintaining muscle mass and overall health rather than a specific weight.
            </p>
        `
  }

  // Set values in popup
  resultValue.textContent = bmi
  resultCategory.textContent = category
  resultCategory.className = `category-${category.toLowerCase()}`
  resultPrecautions.innerHTML = precautions
  resultImage.src = imageUrl || "other images/images-removebg-preview.png"

  // Show popup with animation
  resultPopup.classList.add("show")

  // Add confetti effect for healthy BMI
  if (category === "Healthy") {
    createConfetti()
  }

  // Close button event
  resultClose.addEventListener("click", () => {
    resultPopup.classList.remove("show")
  })
}

// Create confetti effect for healthy BMI
function createConfetti() {
  const confettiContainer = document.getElementById("confetti-container")
  confettiContainer.innerHTML = ""

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div")
    confetti.className = "confetti"
    confetti.style.left = Math.random() * 100 + "vw"
    confetti.style.animationDelay = Math.random() * 5 + "s"
    confetti.style.backgroundColor = getRandomColor()

    confettiContainer.appendChild(confetti)
  }

  setTimeout(() => {
    confettiContainer.innerHTML = ""
  }, 6000)
}

function getRandomColor() {
  const colors = ["#ff6b6b", "#4ecdc4", "#ffbe0b", "#ff9f1c", "#2ec4b6", "#e71d36"]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Add 3D tilt effect to the calculator
// const calculator = document.querySelector(".calculate")
// calculator.addEventListener("mousemove", (e) => {
//   const rect = calculator.getBoundingClientRect()
//   const x = e.clientX - rect.left
//   const y = e.clientY - rect.top

//   const centerX = rect.width / 2
//   const centerY = rect.height / 2

//   const tiltX = (y - centerY) / 20
//   const tiltY = (centerX - x) / 20

//   calculator.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
// })

// calculator.addEventListener("mouseleave", () => {
//   calculator.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
// })

// Add pulse animation to calculate button
const calculateButton = document.getElementById("calc_but")
setInterval(() => {
  calculateButton.classList.add("pulse")
  setTimeout(() => {
    calculateButton.classList.remove("pulse")
  }, 1000)
}, 3000)
