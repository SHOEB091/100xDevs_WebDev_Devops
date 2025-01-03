//A callback function is a function that is passed as an argument to another function 
// and is executed after some operation has been completed. Callbacks are commonly used in asynchronous programming to handle operations like reading files, making network requests, or handling events.



// Define a function that takes a callback as an argument
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data); // Execute the callback function with the data
    }, 2000); // Simulate a 2-second delay
}

// Define a callback function
function handleData(data) {
    console.log("Data received:", data);
}

// Call the fetchData function and pass the handleData function as a callback
fetchData(handleData);