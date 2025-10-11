const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String },
    order: { type: Number, default: 0 } // for ordering content sections
}, { timestamps: true });

module.exports = mongoose.model('CourseContent', courseContentSchema);