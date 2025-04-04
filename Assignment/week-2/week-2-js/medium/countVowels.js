/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let count = 0;

  for (let i = 0; i < str.length; i++) {
      if (vowels.includes(str[i].toLowerCase())) {
          count++;
      }
  }

  return count;
}

// Example usage
const stringName = "Hello World amazing Interesting";
console.log(countVowels(stringName)); // Output: 10

module.exports = countVowels;