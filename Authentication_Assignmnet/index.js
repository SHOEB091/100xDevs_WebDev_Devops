const express = require('express');
const app = express();

// Import middleware
const auth = require('./middleware/auth');

// Import handlers
const { signup, login, getProfile } = require('./handlers/userHandlers');

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Auth routes
app.post("/api/signup", signup);
app.post("/api/login", login);

// Protected route using auth middleware
app.get("/api/profile", auth, getProfile);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});