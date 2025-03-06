const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample user data with kidneys information
const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }, {
        healthy: true
    }]
}]

// Log the first user's information to the console
console.log(users[0]);

// GET endpoint to retrieve kidney information
app.get('/', function (req, res) {
    // Get John's kidneys
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;

    // Count the number of healthy kidneys
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys += 1;
        }
    }

    // Calculate the number of unhealthy kidneys
    const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    // Respond with the kidney information
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnHealthyKidneys
    });
});

// POST endpoint to add a new kidney
app.post('/', function (req, res) {
    // Extract the health status of the new kidney from the request body
    const isHealthy = req.body.isHealthy;

    // Add the new kidney to John's kidneys
    users[0].kidneys.push({
        healthy: isHealthy
    });

    // Respond with a success message
    res.json({
        msg: "Done"
    });
});

// PUT endpoint to update all kidneys to healthy
app.put('/', function (req, res) {
    // Set all kidneys to healthy
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }

    // Respond with an empty object
    res.json({});
});

// DELETE endpoint to remove unhealthy kidneys
app.delete('/', function (req, res) {
    // Check if there is at least one unhealthy kidney
    if (isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = [];

        // Keep only the healthy kidneys
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                });
            }
        }

        // Update John's kidneys with the new list of healthy kidneys
        users[0].kidneys = newKidneys;

        // Respond with a success message
        res.json({ msg: "done" });
    } else {
        // Respond with an error message if there are no unhealthy kidneys
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
});

// Helper function to check if there is at least one unhealthy kidney
function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;

    // Iterate through the kidneys to check for unhealthy ones
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }

    return atleastOneUnhealthyKidney;
}

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});