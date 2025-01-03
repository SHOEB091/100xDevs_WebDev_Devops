const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'a.txt');

// Promisified version of setTimeout
function setTimeoutPromisified(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// Promisified version of fs.readFile
function readFilePromisified(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Use the promisified functions
setTimeoutPromisified(5000)
    .then(() => {
        console.log("Successfully running set timeout");
        return readFilePromisified(filePath);
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.error("Error:", err.message);
    });