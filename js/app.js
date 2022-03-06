// Elements
const $height = document.getElementById("height");
const $weight = document.getElementById("weight");
const $form = document.getElementById("form");
const $calculate = document.getElementById("calculate");
const $result = document.querySelector("#bmi");

// Integer or float number regex
const regexNum = /^\d*\.?\d*$/;

// Functions
const showError = (message) => {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("error");
  const errors = document.querySelectorAll(".error");
  if (errors.length === 0) {
    $form.appendChild(errorMessage);
  }
};

const clearErrors = () => {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => {
    error.remove();
  });
};

const validateUI = (e) => {
  const element = e.target;
  if (element.value.match(regexNum) === null) {
    if (document.querySelectorAll(".error").length !== 0) {
      clearErrors();
    }
    element.classList.add("border-red");
    element.classList.remove("border-green");
    showError("Please enter a valid number");
  } else {
    if (element.value.trim() === "") {
      element.classList.add("border-red");
      element.classList.remove("border-green");
      showError("All fields are required");
    } else {
      const emptyField = document.querySelector(".error");
      element.classList.remove("border-red");
      element.classList.add("border-green");
      emptyField && emptyField.remove();
    }
  }
};

const resetForm = () => {
  $form.reset();
  const corrects = document.querySelectorAll(".border-green");
  corrects.forEach((correct) => {
    correct.classList.remove("border-green");
  });
  clearErrors();
};

const validateValue = (value) => {
  if (value.match(regexNum) === null) {
    return false;
  }
  if (value === "") {
    return false;
  }
  return true;
};

const calculateBMI = (e) => {
  e.preventDefault();
  let report = "";
  const weight = $weight.value;
  let height = $height.value;
  if (height === "" || weight === "") {
    showError("Please fill in all the fields");
    return;
  }
  if (validateValue(height) && validateValue(weight)) {
    height /= 100;
    let BMI = weight / (height * height);
    BMI = BMI.toFixed(2);
    $result.innerHTML = BMI + " kg/m<sup>2</sup>";
    if (BMI < 18.5) {
      report = "Underweight";
    }
    if (BMI >= 18.5 && BMI < 24.9) {
      report = "Healthy";
    }
    if (BMI >= 25 && BMI < 29.9) {
      report = "Overweight";
    }
    if (BMI >= 30) {
      report = "Obese";
    }
    document.querySelector(
      ".result__comment"
    ).innerHTML = `You are <span id="comment">${report}</span>`;
  }
};

const eventListeners = () => {
  // Initialize the app
  document.addEventListener("DOMContentLoaded", resetForm);

  // Form fields
  $height.addEventListener("blur", validateUI);
  $weight.addEventListener("blur", validateUI);

  // Form submit
  $form.addEventListener("submit", calculateBMI);
};

eventListeners();
