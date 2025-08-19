
const ingredientsBtn = document.getElementById("toggleIngredients");
const stepsBtn = document.getElementById("toggleSteps");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");

const ingredients = document.getElementById("ingredients");
const steps = document.getElementById("steps");
const progressBar = document.getElementById("progressBar");
const timerDisplay = document.getElementById("timer");
const timeLeftSpan = document.getElementById("timeLeft");

let currentStep = 0;
let stepElements = steps.getElementsByTagName("li");
let timer;
let timeLeft = 30;

// Toggle ingredients
ingredientsBtn.addEventListener("click", () => {
  ingredients.classList.toggle("hidden");
  ingredientsBtn.textContent = ingredients.classList.contains("hidden")
    ? "Show Ingredients"
    : "Hide Ingredients";
});

// Toggle steps
stepsBtn.addEventListener("click", () => {
  steps.classList.toggle("hidden");
  stepsBtn.textContent = steps.classList.contains("hidden")
    ? "Show Steps"
    : "Hide Steps";
});

// Start Cooking
startBtn.addEventListener("click", () => {
  if (steps.classList.contains("hidden")) steps.classList.remove("hidden");
  currentStep = 0;
  highlightStep();
  nextBtn.disabled = false;
  startBtn.disabled = true;
  timerDisplay.classList.remove("hidden");
  startTimer();
});

// Next Step
nextBtn.addEventListener("click", () => {
  if (currentStep < stepElements.length - 1) {
    currentStep++;
    highlightStep();
  } else {
    alert("🎉 You finished cooking!");
    nextBtn.disabled = true;
  }
});

// Reset
resetBtn.addEventListener("click", () => {
  clearHighlight();
  currentStep = 0;
  progressBar.style.width = "0%";
  nextBtn.disabled = true;
  startBtn.disabled = false;
  timerDisplay.classList.add("hidden");
  clearInterval(timer);
  timeLeft = 30;
  timeLeftSpan.textContent = timeLeft;
});

// Highlight step
function highlightStep() {
  clearHighlight();
  stepElements[currentStep].classList.add("active-step");
  let progress = ((currentStep + 1) / stepElements.length) * 100;
  progressBar.style.width = progress + "%";
}

// Clear highlights
function clearHighlight() {
  for (let step of stepElements) {
    step.classList.remove("active-step");
  }
}

// Timer
function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timeLeftSpan.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeLeftSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏰ Time's up!");
    }
  }, 60000); // 1 minute per "min"
}
