import { bmiData, conversionData } from "./constants.js";

const clearButton = document.getElementById("clear");
const calculateButton = document.getElementById("calculate");
const result = document.getElementById("bmi-result");

// weights
const lbs = document.querySelector("#lbs");
const kg = document.querySelector("#kg");
const g = document.querySelector("#gm");
const oz = document.querySelector("#oz");

// heights
const cm = document.querySelector("#cm");
const m = document.querySelector("#m");
const inch = document.querySelector("#in");
const ft = document.querySelector("#ft");

// health indices
const bmiRange = document.querySelector("#bmiRange");
const caloriesIntake = document.querySelector("#caloriesIntake");
const caloriesBurn = document.querySelector("#caloriesBurn");
const advice = document.querySelector("#advice");

const bmiInputs = document.querySelector(".bmi-inputs");

bmiInputs.addEventListener("input", (e) => {
  if (e.target.id === "lbs") {
    kg.value = conversionData.weight.lbs.toKg(e.target.value).toFixed(2);
    g.value = conversionData.weight.lbs.toG(e.target.value).toFixed(2);
    oz.value = conversionData.weight.lbs.toOz(e.target.value).toFixed(2);
  } else if (e.target.id === "kg") {
    lbs.value = conversionData.weight.kg.toLbs(e.target.value).toFixed(2);
    g.value = conversionData.weight.kg.toG(e.target.value).toFixed(2);
    oz.value = conversionData.weight.kg.toOz(e.target.value).toFixed(2);
  } else if (e.target.id === "gm") {
    lbs.value = conversionData.weight.g.toLbs(e.target.value).toFixed(2);
    kg.value = conversionData.weight.g.toKg(e.target.value).toFixed(2);
    oz.value = conversionData.weight.g.toOz(e.target.value).toFixed(2);
  } else if (e.target.id === "oz") {
    lbs.value = conversionData.weight.oz.toLbs(e.target.value).toFixed(2);
    kg.value = conversionData.weight.oz.toKg(e.target.value).toFixed(2);
    g.value = conversionData.weight.oz.toG(e.target.value).toFixed(2);
  } else if (e.target.id === "cm") {
    m.value = conversionData.height.cm.toM(e.target.value).toFixed(2);
    inch.value = conversionData.height.cm.toIn(e.target.value).toFixed(2);
    ft.value = conversionData.height.cm.toFt(e.target.value).toFixed(2);
  } else if (e.target.id === "m") {
    cm.value = conversionData.height.m.toCm(e.target.value).toFixed(2);
    inch.value = conversionData.height.m.toIn(e.target.value).toFixed(2);
    ft.value = conversionData.height.m.toFt(e.target.value).toFixed(2);
  } else if (e.target.id === "in") {
    cm.value = conversionData.height.in.toCm(e.target.value).toFixed(2);
    m.value = conversionData.height.in.toM(e.target.value).toFixed(2);
    ft.value = conversionData.height.in.toFt(e.target.value).toFixed(2);
  } else if (e.target.id === "ft") {
    cm.value = conversionData.height.ft.toCm(e.target.value).toFixed(2);
    m.value = conversionData.height.ft.toM(e.target.value).toFixed(2);
    inch.value = conversionData.height.ft.toIn(e.target.value).toFixed(2);
  }
});

clearButton.addEventListener("click", () => {
  lbs.value = "";
  kg.value = "";
  g.value = "";
  oz.value = "";
  cm.value = "";
  m.value = "";
  inch.value = "";
  ft.value = "";
  result.textContent = "BMI is ____";
  bmiRange.textContent = "Your BMI range and category";
  caloriesIntake.textContent = "Daily calories intake";
  caloriesBurn.textContent = "Minimum calories need to burn";
  advice.textContent = "Health related advice";
});

calculateButton.addEventListener("click", () => {
  const weight = parseFloat(kg.value);
  const height = parseFloat(m.value);
  if (!weight || !height) {
    alert("Please give inputs");
    return;
  }
  if (typeof weight !== "number" || typeof height !== "number") {
    alert("Please give number inputs");
    return;
  }
  const bmi = weight / height ** 2;
  result.textContent = `Your BMI is ${bmi.toFixed(2)}`;

  //   bmiData.forEach((data)=>{
  //     if (bmi ){

  //     }
  //   })
  function getBMIAdvice(bmi) {
    return bmiData.find((item) => bmi >= item.minBMI && bmi <= item.maxBMI);
  }
  let bmiAdvice = getBMIAdvice(bmi);
  bmiRange.innerHTML = `Your BMI range is ${bmiAdvice.minBMI} - ${bmiAdvice.maxBMI} and your category is ${bmiAdvice.category}`;
  caloriesIntake.innerHTML = `You need minimum calories ${bmiAdvice.minCaloriesIntake} daily`;
  caloriesBurn.innerHTML = `You need to burn calories ${bmiAdvice.minCaloriesBurn} daily`;
  advice.innerHTML = `${bmiAdvice.advice}`;
});
