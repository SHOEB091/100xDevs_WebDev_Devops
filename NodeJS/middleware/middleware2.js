let requestCount = 0;

// Middleware function to increase the request count
function requestIncreaser(req, res, next) {
    // Increment the request count
    requestCount++;
    // Log the current request count to the console
    console.log("Request Count: ", requestCount);
    // Call the next middleware function in the stack
    next();
}

// Handler function to calculate the sum of two query parameters
function realSumHandler(req, res) {
    // Parse the query parameters 'a' and 'b' as integers
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    // Respond with the sum of 'a' and 'b'
    res.json({
        ans: a + b
    });
}

// Define a GET route for '/sum' that uses the requestIncreaser middleware and the realSumHandler
app.get("/sum", requestIncreaser, realSumHandler);

// Define a GET route for '/multiply' that calculates the product of two query parameters
app.get("/multiply", function(req, res) {
    // Parse the query parameters 'a' and 'b' as integers
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    // Respond with the product of 'a' and 'b'
    res.json({
        ans: a * b
    });
});