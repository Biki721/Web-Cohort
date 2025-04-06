const teas = [
  "Green Tea",
  "Black Tea",
  "Oolong Tea",
  "White Tea",
  "Herbal Tea",
];

console.log(teas);

// teas.push("Chamomile Tea");
// console.log(teas);

//Problem: Remove Oolong Tea from the list of teas
const index = teas.indexOf("Oolong Tea");
if (index > -1) {
  teas.splice(index, 1);
}
console.log(teas);

// Problem: Filter the list to only include teas that are caffeinated
console.log(
  "Caffeinated: ",
  teas.filter((tea) => tea !== "Herbal Tea")
);
//  alternate
for (let i = 0; i < teas.length; i++) {
  if (teas[i] === "Herbal Tea") {
    teas.splice(i, 1);
  }
}
console.log(teas);
// Problem: Sort the list of teas in alphabetical order
console.log(teas.sort());

// alternate
console.log(teas.sort((a, b) => a.localeCompare(b)));

// Problem: Use a for loop to print each type of tea in the array
for (let i = 0; i < teas.length; i++) {
  console.log(teas[i]);
}

// alternate
teas.forEach((tea) => console.log(tea));

// alternate
for (const tea of teas) {
  console.log(tea);
}

// Problem: Use a for loop to count how many teas are caffeinated excluding Herbal Tea
let count = 0;
for (let i = 0; i < teas.length; i++) {
  if (teas[i] !== "Herbal Tea") {
    count++;
  }
}
console.log(count);

// alternate
count = 0;
teas.forEach((tea) => {
  if (tea !== "Herbal Tea") {
    count++;
  }
});
console.log(count);

// alternate
count = 0;
for (const tea of teas) {
  if (tea !== "Herbal Tea") {
    count++;
  }
}
console.log(count);

//alternate
let totalCount = 0;
teas.map((tea) => {
  if (tea !== "Herbal Tea") {
    totalCount++;
  }
});
console.log(totalCount);

//alternate
count = teas
  .map((tea) => (tea !== "Herbal Tea" ? 1 : 0))
  .reduce((acc, curr) => acc + curr, 0);
console.log("totalCount: ", count);

// alternate
count = teas.filter((tea) => tea !== "Herbal Tea").length;
console.log("Total filter count: ", count);

// Problem: Use a for loop to create a new array with all tea names in uppercase

const uppercaseTeas = teas.map((tea) => tea.toUpperCase());
console.log(uppercaseTeas);

// alternate
const teasInUppercase = [];
teas.forEach((tea) => teasInUppercase.push(tea.toUpperCase()));
console.log(teasInUppercase);

//alterante
let uppercaseInTeas = [];
for (let i = 0; i < teas.length; i++) {
  uppercaseInTeas.push(teas[i].toUpperCase());
}
console.log(uppercaseInTeas);

uppercaseInTeas = [];
for (const tea of teas) {
  uppercaseInTeas.push(tea.toUpperCase());
}
console.log(uppercaseInTeas);

// Problem: Use a for loop to find the tea name with most characters
let maxLength = 0;
let longestTeaName = "";
teas.forEach((tea) => {
  if (tea.length > maxLength) {
    maxLength = tea.length;
    longestTeaName = tea;
  }
});
console.log(longestTeaName);

// alternate
longestTeaName = "";
teas.forEach((tea) => {
  if (tea.length > longestTeaName.length) {
    longestTeaName = tea;
  }
});
console.log(longestTeaName);

//Problem: Use a for loop to reverse the order of teas in the array
const reversedArray = [];
for (let i = teas.length - 1; i >= 0; i--) {
  reversedArray.push(teas[i]);
}
console.log(reversedArray);
