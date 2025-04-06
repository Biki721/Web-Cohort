// function declaration
function printChai() {
  console.log("Chai");
}

printChai();

// Arrow expression
let bringBrush = () => {
  console.log("Brush");
};

bringBrush();

// function expression
const bringPaste = function (num1) {
  console.log("Paste", num1);
};

bringPaste(2);

// IIFE - Immediately Invoked Function Expression
(function add(num1, num2) {
  console.log("Addition", num1 + num2);
})(10, 20);

function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

let gen = generator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

const numbers = [1, 2, 3, 4];

const squaredWithMap = numbers.map((num) => num * num);
console.log(squaredWithMap); // [1, 4, 9, 16] (new array)

const resultWithForEach = numbers.forEach((num) => num * num);
console.log(resultWithForEach); // undefined (no new array)

let pizzaSize;
let numberOfPeople = 4;
let size =
  numberOfPeople <= 2 ? "Small" : numberOfPeople <= 5 ? "Medium" : "Large";
console.log(size);

let score = 90;
let grade =
  score >= 90
    ? "A"
    : score >= 80
    ? "B"
    : score >= 70
    ? "C"
    : score >= 60
    ? "D"
    : "F";

console.log(grade);

let myArray = [1, 2, 3, 4, 5, 6];
function sumfac(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}
console.log(sumfac(myArray));

const scores = [50, 85, 90, 60, 45];
const passingScores = scores.filter((score) => score >= 60);
console.log(passingScores); // [85, 90, 60]

// array.filter(callback(element[, index[, array]])[, thisArg])
// array.filter(callback(currentValue, index, array), thisArg)
// const fruits = ["apple", "banana"];
// fruits.push("orange");
// console.log(fruits); // ["apple", "banana", "orange"]

// const colors = ["red", "blue", "green"];
// const removedColor = colors.pop();
// console.log(colors); // ["red", "blue"]
// console.log(removedColor); // "green"

let a = 3.14;
console.log(typeof a); // number

// comparison operators
console.log(1 == "1"); // true
console.log(1 === "1"); // false
console.log(1 != "1"); // false
console.log(1 !== "1"); // true
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(null > 0); // false
console.log(null >= 0); // true
console.log(null < 0); // false
console.log(null <= 0); // true
console.log(null == 0); // false
console.log(null === 0); // false
console.log(undefined == 0); // false
console.log(undefined === 0); // false
console.log(undefined == null); // true
console.log(undefined === null); // false
console.log(undefined > 0); // false
console.log(undefined >= 0); // false
console.log(undefined < 0); // false
console.log(undefined <= 0); // false
console.log(typeof 1234n);

let name = new String("John");

let username = name;

console.log(name === username); // true
username = new String("Jane");
console.log(name);
console.log(username);
array.shift();

const animals = ["lion", "tiger", "bear"];
const removedAnimal = animals.shift();
console.log(animals); // ["tiger", "bear"]
console.log(removedAnimal); // "lion"

let text = "Hello, World!";
console.log(text.replace("World", "JavaScript")); // Output: "Hello, JavaScript!"
