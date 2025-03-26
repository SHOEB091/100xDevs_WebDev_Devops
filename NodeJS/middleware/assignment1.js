const express = require('express');
const app = express();

// Middleware function to log each incoming request's HTTP method, URL, and timestamp
function logRequest(req, res, next) {
   console.log(`Request made to: ${req.method} ${req.url} at ${new Date().toLocaleString()}`);
   next(); // Pass control to the next middleware or route handler
}

// Apply the middleware globally to all routes
app.use(logRequest);

// Define some example routes
app.get('/', (req, res) => {
   res.send('Welcome to the homepage!');
});

app.get('/about', (req, res) => {
   res.send('This is the about page.');
});

app.get('/special', (req, res) => {
   res.send('This route uses the global middleware!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});