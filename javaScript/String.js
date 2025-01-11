// let singleQuoteString = 'Hello, World!';
// let doubleQuoteString = "Hello, World!";
// let templateLiteralString = `Hello, World!`;


let str = "Hello, World!";
console.log(str.length); // Output: 13

console.log(str.charAt(0)); // Output: H

console.log(str.indexOf('World')); // Output: 7

console.log(str.lastIndexOf('o')); // Output: 8

console.log(str.includes('World')); // Output: true

console.log(str.startsWith('Hello')); // Output: true

console.log(str.endsWith('!')); // Output: true

console.log(str.substring(0, 5)); // Output: Hello

console.log(str.slice(0, 5)); // Output: Hello
console.log(str.slice(-6)); // Output: World!

console.log(str.toUpperCase()); // Output: HELLO, WORLD!

let paddedStr = "   Hello, World!   ";
console.log(paddedStr.trim()); // Output: Hello, World!

console.log(str.split(', ')); // Output: ["Hello", "World!"]

console.log(str.replace('World', 'JavaScript')); // Output: Hello, JavaScript!

