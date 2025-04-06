// Get Date and Time
date = new Date();
console.log(date);
console.log("Year", date.getFullYear());
console.log("Month", date.getMonth());
console.log("Date", date.getDate());
console.log("Day", date.getDay());
console.log("Hours", date.getHours());
console.log("Minutes", date.getMinutes());
console.log("Seconds", date.getSeconds());
console.log("Milliseconds", date.getMilliseconds());
console.log("Time", date.getTime()); // to be explored

// Set Date and Time
setDate = new Date();
console.log(setDate);
setDate.setFullYear(2021);
console.log(setDate);
setDate.setMonth(11);
console.log(setDate);
setDate.setDate(25);
console.log(setDate);
setDate.setHours(12);
console.log(setDate);
setDate.setMinutes(30);
console.log(setDate);
setDate.setSeconds(45);
console.log(setDate);
setDate.setMilliseconds(100);
console.log(setDate);
setDate.setTime(0);
console.log(setDate);

// Date to String Methods
console.log(date.toString());
console.log(date.toDateString());
console.log(date.toTimeString());
console.log(date.toLocaleString());
console.log(date.toLocaleDateString());
console.log(date.toLocaleTimeString());
console.log(date.toUTCString());
console.log(date.toISOString()); // toISOString() returns a string in simplified extended ISO format (ISO 8601), which is always 24 or 27 characters long (YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ, respectively). The timezone is always zero UTC offset, as denoted by the suffix "Z".

// Date Arithmetic

// Adding Days to a Date
let today = new Date();
console.log(today.setDate(today.getDate() + 7));
console.log(today.toString());

// Subtracting Dates
const date1 = new Date("2025-02-07");
const date2 = new Date("2025-02-01");
const difference = date1 - date2;
console.log(difference); // Difference in milliseconds
console.log(difference / (1000 * 60 * 60 * 24)); // Difference in days

// temporal.now()
const { Temporal } = require("@js-temporal/polyfill");

console.log(Temporal.now());
console.log(Temporal.now.instant());
console.log(Temporal.now.timeZone());
console.log(Temporal.now.zonedDateTime());
console.log(Temporal.now.plainDate());
console.log(Temporal.now.plainTime());
console.log(Temporal.now.plainDateTime());
console.log(Temporal.now.zonedDateTimeISO());
console.log(Temporal.now.plainDateISO());
console.log(Temporal.now.plainTimeISO());
console.log(Temporal.now.plainDateTimeISO());
console.log(Temporal.now.zonedDateTimePlainDateTime());
console.log(Temporal.now.zonedDateTimePlainDate());
console.log(Temporal.now.zonedDateTimePlainTime());
console.log(Temporal.now.zonedDateTimePlainDateTimeISO());
console.log(Temporal.now.zonedDateTimePlainDateISO());
console.log(Temporal.now.zonedDateTimePlainTimeISO());
console.log(Temporal.now.zonedDateTimePlainDateTimeISO());
console.log(Temporal.now.zonedDateTimePlainDateISO());
