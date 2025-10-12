const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email:{ type: String, required: true, unique: true },
  password:{ type: String, required: true }
}, { timestamps: true });

// Export the MODEL, not the schema or an object
module.exports = mongoose.model('Admin', adminSchema);