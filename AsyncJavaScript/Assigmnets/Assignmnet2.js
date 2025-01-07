const fs = require('fs');
const path = require('path');

// Adjust the path to point to 'a.txt' located one level up from the current directory
const filePath = path.join(__dirname, '../a.txt');

// Promisified version of fs.readFile
function readFilePromisified(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject("Error while reading file ");
            } else {
                resolve(data);
            }
        });
    });
}

// Promisified version of fs.writeFile
function writeFilePromisified(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf-8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Async function to read, trim, and write the file content
async function processFile(filePath) {
    try {
        console.log("Reading file...");
        const data = await readFilePromisified(filePath);
        console.log("Original content:", data);

        const trimmedData = data.trim();
        console.log("Trimmed content:", trimmedData);

        console.log("Writing trimmed content back to file...");
        await writeFilePromisified(filePath, trimmedData);
        console.log("File content trimmed and written back successfully.");
    } catch (err) {
        console.error("Error:", err.message);
    }
}

// Call the function with the file path
processFile(filePath);