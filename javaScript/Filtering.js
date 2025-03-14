// filter() creates a new array that contains only the items that match a condition.

const numbers = [1, 2, 3, 4, 5, 6];

// Keep only even numbers
const evens = numbers.filter(num => num % 2 === 0);

console.log(evens); // Output: [2, 4, 6]


// Example2 keep names with more than three letters 
const names = ["Ali", "John", "Sam", "Peter"];

// Keep only names with more than 3 letters
const longNames = names.filter(name => name.length > 3);

console.log(longNames); // Output: ["John", "Peter"]









