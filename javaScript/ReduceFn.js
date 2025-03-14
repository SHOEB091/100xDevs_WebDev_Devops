//reduce() takes all the items in an array and combines them into a single value (like sum, multiplication, etc.).

const numbers = [1, 2, 3, 4, 5];

// Add all numbers
const sum = numbers.reduce((total, num) => total + num, 0);

console.log(sum); // Output: 15



const words = ["apple", "banana", "cherry", "strawberry"];

function longestWord(accumulator, currentValue) {
    if (currentValue.length > accumulator.length) {
        return currentValue; // Update if current word is longer
    }
    return accumulator; // Keep the existing longest word
}

const longest = words.reduce(longestWord, "");

console.log(longest); // Output: "strawberry"








