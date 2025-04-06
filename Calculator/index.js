const AC = document.getElementById("AC");
const DE = document.getElementById("DE");
const dot = document.getElementById("dot");
const divide = document.getElementById("divide");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const star = document.getElementById("star");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const minus = document.getElementById("minus");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const plus = document.getElementById("plus");
const doubleZero = document.getElementById("doubleZero");
const zero = document.getElementById("zero");
const equalsTo = document.getElementById("equalsTo");
const calculatorItems = document.getElementById("calculator-items");
const resultDisplay = document.querySelector(".resultDisplay");
const numberDisplay = document.querySelector(".numberDisplay");

let currentInput = "";
let resultInput = "";

calculatorItems.addEventListener("click", function (e) {
  const clickedButton = e.target.id;
  if (!clickedButton) {
    return;
  }

  switch (clickedButton) {
    case "AC":
      resultDisplay.textContent = `Ans = ${currentInput}`;
      currentInput = "0";
      numberDisplay.textContent = currentInput;
      break;
    case "DE":
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
      }
      numberDisplay.textContent = currentInput || 0;
      break;
    case "dot":
      if (!currentInput.includes(".")) {
        currentInput += ".";
        numberDisplay.textContent = currentInput;
      }
      break;
    case "divide":
    case "star":
    case "minus":
    case "plus":
      currentInput += ` ${e.target.textContent} `;
      numberDisplay.textContent = currentInput;
      break;
    case "equalsTo":
      try {
        resultInput = currentInput;
        currentInput = eval(currentInput).toString();
        numberDisplay.textContent = currentInput;
        resultDisplay.textContent = `${resultInput} = `;
      } catch (error) {
        currentInput = "Error";
        numberDisplay.textContent = currentInput;
      }
      break;

    default:
      if (!isNaN(e.target.textContent)) {
        if (currentInput === "0" && e.target.textContent === "0") {
          break;
        }

        if (currentInput === "0") {
          currentInput = e.target.textContent; // Replace 0 instead of appending
        } else {
          currentInput += e.target.textContent;
        }
        numberDisplay.textContent = currentInput;
      }

      break;
  }
});
