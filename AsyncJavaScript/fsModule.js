const fs = require("fs");
const path = require('path');

// Resolve the path to 'a.txt' relative to the current script's directory
const filePath = path.join(__dirname, 'a.txt');

const filePath2 = path.join(__dirname, 'b.txt');

const contents = fs.readFileSync(filePath, "utf-8");
console.log(contents);


const content2 = fs.readFileSync(filePath2, 'utf8');
console.log(content2);