const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Users = require('../models/users');
const bcrypt = require('bcryptjs');

async function signin(req, res) {
    const { username, password } = req.body;

    try {
        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ message: "Please provide username and password" });
        }

        // Check if user exists
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        // Return success with token
        res.status(200).json({
            message: "Signin successful",
            token
        });

    } catch (err) {
        console.error('Signin error:', err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
module.exports = signin;