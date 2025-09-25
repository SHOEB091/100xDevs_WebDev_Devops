const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/users'); // Adjusted to match your file name
const bcrypt = require('bcryptjs');

async function signup(req, res) {
    const { username, email, password } = req.body; // Added email

    try {
        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide username, email, and password" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

        // Create and save new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });

        // Return success with token
        res.status(201).json({
            message: "User created successfully",
            token
        });

    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports = signup;