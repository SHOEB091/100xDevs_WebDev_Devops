const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and get userId
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// Create a new todo
router.post('/', authMiddleware, async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Todo text required' });
    const todo = new Todo({ userId: req.userId, text });
    await todo.save();
    res.status(201).json(todo);
});

// Get all todos for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
});

// Delete a todo by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
});

// Update a todo by ID
router.put('/:id', authMiddleware, async (req, res) => {
    const { text, completed } = req.body;
    const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        { text, completed },
        { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
});

module.exports = router;