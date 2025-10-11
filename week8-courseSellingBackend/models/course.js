const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, 
    imageUrl: { type: String },
    creatorId: { type: mongoose.Schema.Types.ObjectId } // <-- correct ObjectId type
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema); // <-- add model name