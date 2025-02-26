const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/route-handler", function(req, res) {
    // header, body, query parameters
    // do machine learning model

    // Accessing query parameters
    const queryParams = req.query;

    // Accessing headers
    const headers = req.headers;

    res.json({
        name: "shoeb iqbal",
        age: 21,
        queryParams: queryParams,
        headers: headers
    });
});

app.get('/', function(req, res) {
    res.send("Hello World!");
});

// Post request: how to handle post request body of the post request
app.post('/conversations', function(req, res) {
    // Requesting body
    console.log(req.body);
    
    // Requesting headers
    console.log(req.headers);

    res.send('<b> Hello Shoeb Sir </b>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});