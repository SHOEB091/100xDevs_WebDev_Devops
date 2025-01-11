let now = new Date();

console.log("Year:", now.getFullYear()); // Output: Year: 2023
console.log("Month:", now.getMonth()); // Output: Month: 9 (0-based, 9 = October)
console.log("Date:", now.getDate()); // Output: Date: 10
console.log("Day:", now.getDay()); // Output: Day: 2 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
console.log("Hours:", now.getHours()); // Output: Hours: 10
console.log("Minutes:", now.getMinutes()); // Output: Minutes: 0
console.log("Seconds:", now.getSeconds()); // Output: Seconds: 0
console.log("Milliseconds:", now.getMilliseconds()); // Output: Milliseconds: 0
console.log("Time (milliseconds since Jan 1, 1970):", now.getTime()); // Output: Time: 1696932000000