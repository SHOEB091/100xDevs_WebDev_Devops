const express = require('express');
const app = express();
const PORT = 3000;

// Variable to keep track of the total number of requests
let requestCount = 0;

// Middleware to count requests
function requestCounter(req, res, next) {
    // Increment the request count
    requestCount++;
    // Log the current request count to the console
    console.log("Request Count: ", requestCount);
    // Pass control to the next middleware or route handler
    next();
}

// Apply the middleware globally to all routes
app.use(requestCounter);

// Handler function to calculate the sum of two query parameters
function realSumHandler(req, res) {

    //querry parameters https:localhost:3000/sum?a=5&b=10
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    });
}

// Define a GET route for '/sum' that uses the realSumHandler
app.get("/sum", realSumHandler);

// Define a GET route for '/multiply' that calculates the product of two query parameters
app.get("/multiply", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a * b
    });
});

// Define an endpoint to expose the total request count
app.get("/request-count", function (req, res) {
    res.json({
        totalRequests: requestCount
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});