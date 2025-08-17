const express = require('express');
const app = express();

// Import middleware
const auth = require('./middleware/auth');

// Import handlers
const { signup, signin, getProfile } = require('./handlers/userhandler');

// Import path module at the top of the file
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route - serves index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Auth routes
app.post("/api/signup", signup);
app.post("/api/signin", signin);

// Protected route using auth middleware
app.get("/api/profile", auth, getProfile);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});