const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    } // Links to the User model
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);