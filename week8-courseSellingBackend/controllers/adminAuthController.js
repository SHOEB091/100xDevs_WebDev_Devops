const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel"); // <-- Rename for clarity
const mongoose = require('mongoose');
const Course = require('../models/course');

const adminSignup = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ name, email, password: hashedPassword });
    if (!process.env.JWT_SECRET_ADMIN) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email }
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const adminSignin = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!process.env.JWT_SECRET_ADMIN) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Signin successful",
      token,
      user: { id: admin._id, name: admin.name, email: admin.email }
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { adminSignup, adminSignin };