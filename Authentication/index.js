const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = []; // Store users and their tokens

app.get("/", (req, res) => {
    res.send("Hello World!");
});

function signUpHandler(req, res) {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Generate token and store user
    const token = jwt.sign({ username }, "secret");
    users.push({ username, password, token });

    res.json({
        message: "You are signed up",
        token
    });
    console.log(users);
}

function signInHandler(req, res) {
    const { username, password } = req.body;

    // Find user
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Return the existing token
    res.json({
        message: "You are signed in",
        token: user.token
    });
    console.log(users);
}

app.post("/signup", signUpHandler);
app.post("/signin", signInHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});