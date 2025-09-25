require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const signup = require('./auth/signupHandler');
const signin = require('./auth/signinHandler');

const todoRoutes = require('./routes/todo');

const app = express();
const PORT = process.env.PORT || 3000;



app.use('/api/todos', todoRoutes);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todos', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Authentication routes
app.post('/register', signup);
app.post('/signin', signin);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});