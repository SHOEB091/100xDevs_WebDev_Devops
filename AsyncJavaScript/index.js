const fs = require('fs');

function print(err, data){
    console.log(data);
}

fs.readFile("a.txt", "utf-8", print); //asynchronously

fs.readFile("b.txt", "utf-8", print); //asynchronously

console.log("DONE!");

//anything is I/O operation, it will be done asynchronously
// the things withich gets offloaded are asychronous 