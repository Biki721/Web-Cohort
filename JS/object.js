// /*
// const teas = {
//   name: "Lemon tea",
//   type: "Green",
//   caffeine: "low",
// };

// teas.origin = "Assam";
// teas.caffeine = "medium";

// delete teas.type;
// console.log(teas);

// console.log(teas.hasOwnProperty("origin"));
// console.log("origin" in teas);

// for (let key in teas) {
//   console.log(`${key}:-> ${teas[key]}`);
// }
// */

// function shinyDiamondRug(n) {
//   let diamond = "";
//   for (let i = 1; i <= n; i++) {
//     for (let k = 1; k <= n - i; k++) {
//       diamond += " ";
//     }

//     for (let j = 1; j <= 2 * i - 1; j++) {
//       diamond += "*";
//     }
//     diamond += "\n";
//   }

//   for (let i = n - 1; i >= 1; i--) {
//     for (let k = 1; k <= n - i; k++) {
//       diamond += " ";
//     }

//     for (let j = 1; j <= 2 * i - 1; j++) {
//       diamond += "*";
//     }
//     if (i > 1) {
//       diamond += "\n";
//     }
//   }
//   return diamond;
// }
// console.log(shinyDiamondRug(4));

// const pipe = function (...functions) {
//   return function (initialValue) {
//     return functions.reduce((acc, fn) => fn(acc), initialValue);
//   };
// };

const double = (x) => 2 * x;
const triple = (x) => 3 * x;

const pipe =
  (...functions) =>
  (initialValue) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

const multiply6 = pipe(double, triple);
// console.log(multiply6(6));

let userActivity = [
  { user: "Alice", activityCount: 45 },
  { user: "Bob", activityCount: 72 },
  { user: "CHarlie", activityCount: 33 },
];

const max = userActivity.reduce((active, currentUser) =>
  currentUser.activityCount > active.activityCount ? currentUser : active
);

// console.log(max);

let expenses = [
  { description: "Groceries", amount: 50, category: "Food" },
  { description: "Electricity Bill", amount: 100, category: "Utilities" },
  { description: "Dinner", amount: 30, category: "Food" },
  { description: "Internet Bill", amount: 50, category: "Utilities" },
];

// let expenseReport = expenses.reduce(
//   (report, expense) => {
//     report[expense.category] += expense.amount;
//     return report;
//   },
//   { Food: 0, Utilities: 0 }
// );

// not dynamic ebove one
let expenseReport = expenses.reduce((report, expense) => {
  report[expense.category] = (report[expense.category] || 0) + expense.amount;
  return report;
}, {});

// console.log(expenseReport);

let tasks = [
  { description: "Write Report", completed: false, priority: 2 },
  { description: "Send Email", completed: true, priority: 3 },
  { description: "Prepare presentation", completed: false, priority: 1 },
];

let priorityTask = tasks.reduce((acc, task) => {
  if (!task.completed) {
    acc.push(task);
  }
  return acc;
}, []);
// console.log(priorityTask.sort((a, b) => a.priority - b.priority));

let taskPriority = tasks
  .filter((task) => !task.completed)
  .sort((a, b) => a.priority - b.priority);
// console.log(taskPriority);

let movieRatings = [
  { title: "Movie A", ratings: [4, 5, 3] },
  { title: "Movie B", ratings: [5, 5, 4] },
  { title: "Movie C", ratings: [3, 4, 2] },
];

// let averageRating = movieRatings.reduce((acc, movie) => {
//   movie.ratings =
//     movie.ratings.reduce((acc, rate) => acc + rate) / movie.ratings.length;
//   acc.push(movie);
//   return acc;
// }, []);

// console.log(averageRating);

console.log(
  movieRatings.map((movie) => {
    movie.ratings =
      movie.ratings.reduce((acc, rate) => acc + rate, 0) / movie.ratings.length;
    return movie;
  })
);
