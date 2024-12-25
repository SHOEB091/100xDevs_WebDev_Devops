const users = ["harkirat", "raman", "diljeet"];
const tatalUsers = users.length;
const firstUser = users[0];

//Assignment 1 Write a funcitont that takes an array of Intgers a input and returns a new Array with only even Values. Read about filter in JS

const numbers = [1,2,3,4,5,6,7,8,9,10];

/*const evenNumbers = number.filter(function(number){
    return number%2===0;
})

console.log(evenNumbers);
*/
function filterArray(numbers) {
    return numbers.filter(number => number % 2 === 0);
}

const ans = filterArray(numbers);
console.log(ans);