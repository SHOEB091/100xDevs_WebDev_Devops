const express = require ('express');

const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const path = require('path');


JWT_SECRET = 'hello@demo.com';

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

const Users = []

function SignUpHandler(req, res) {
    const { userName, password } = req.body;
    const existingUser = Users.find(user => user.userName === userName);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const token = jwt.sign({ userName }, JWT_SECRET);
    Users.push({ userName, password, token });
    res.json({ message: "You are signed up", token });
}

function SignInHandler(req, res) {
    const { userName, password } = req.body;
    const user = Users.find(user => user.userName === userName && user.password === password);
    if (!user) {
        return res.status(400).json({ message: "Invalid username and password" });
    }
    res.json({ message: "You are signed in", token: user.token });
}

function MeHandler(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        res.json({ username: decoded.userName });
    } catch (e) {
        res.status(401).json({ message: "Invalid token" });
    }
}

app.post("/signup", SignUpHandler);
app.post("/signin", SignInHandler);
app.get("/me", MeHandler);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});











