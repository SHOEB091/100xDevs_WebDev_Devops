/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

let str = "oppo";

function isPalindrome(str) {
    // Convert the string to lowercase
    str = str.toLowerCase();
    
    // Reverse the string
    let reverse = str.split('').reverse().join('');
    
    // Check if the original string is equal to the reversed string
    if (str === reverse) {
        return true;
    } else {
        return false;
    }
}

// Example usage
console.log(isPalindrome(str)); // Output: true


module.exports = isPalindrome;
